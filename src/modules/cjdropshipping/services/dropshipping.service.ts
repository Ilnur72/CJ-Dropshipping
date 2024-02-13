import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from '../dto/create-order';

@Injectable()
export class DropshippingService {
  constructor(
    @Inject('cjdropshipping_mq') private readonly client: ClientProxy,
    @InjectModel() private readonly knex: Knex,
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  public async getCategory() {
    try {
      const { accessToken } = await this.knex.table('session').first();
      const url =
        'https://developers.cjdropshipping.com/api2.0/v1/product/getCategory';
      const {
        data: { data },
      } = await this.httpService
        .get(url, { headers: { 'CJ-Access-Token': accessToken } })
        .toPromise();
      for (const categoryFirst of data) {
        await this.knex.table('category').insert({
          categoryId: categoryFirst.categoryFirstId,
          categoryName: categoryFirst.categoryFirstName,
        });
        for (const categorySecond of categoryFirst.categoryFirstList) {
          await this.knex.table('category').insert({
            categoryId: categorySecond.categorySecondId,
            categoryName: categorySecond.categorySecondName,
            parentId: categoryFirst.categoryFirstId,
          });
          for (const category of categorySecond.categorySecondList) {
            await this.knex.table('category').insert({
              categoryId: category.categoryId,
              categoryName: category.categoryName,
              parentId: categorySecond.categorySecondId,
            });
          }
        }
      }
      return 'Categories were successfully added.';
    } catch (error) {
      if (error.response?.status === 401) {
        await this.authService.refreshAccessToken();
        return await this.getCategory();
      } else if (error.code === '23505') console.log(error.detail);
      else console.log(error);
    }
  }

  async listProdduct() {
    try {
      const data = this.knex.table('product');
      const total = await data.clone().count().first();
      const products = await data
        .leftJoin('variants', 'product.pid', 'variants.pid')
        .select('product.*', this.knex.raw('JSON_AGG(variants.*) as variants'))
        .groupBy('product.id');

      // const products = await data
      return { total: total.count, products };
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const { accessToken } = await this.knex.table('session').first();
      const url =
        'https://developers.cjdropshipping.com/api2.0/v1/product/list?pageSize=100';
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      // const {
      //   data: { data },
      // } = await this.httpService
      //   .get(url, { headers: { 'CJ-Access-Token': accessToken } })
      //   .toPromise();
      // const totalRequest = Math.ceil(data.total / data.pageSize);
      for (let page = 1; page <= 10; page++) {
        await delay(5000);
        const {
          data: { data },
        } = await this.httpService
          .get(url, {
            params: { pageNum: page },
            headers: { 'CJ-Access-Token': accessToken },
          })
          .toPromise();
        console.log(page);
        await this.getDetails(data.list);
      }
      return 'Products were successfully added.';
    } catch (error) {
      if (error.response?.status === 401) {
        await this.authService.refreshAccessToken();
        return await this.getProducts();
      }
      console.log(error);
    }
  }

  async getDetails(productList): Promise<void> {
    try {
      const { accessToken } = await this.knex.table('session').first();
      for (const product of productList) {
        const { data: details } = await this.httpService
          .get(
            'https://developers.cjdropshipping.com/api2.0/v1/product/query',
            {
              params: { pid: product.pid },
              headers: { 'CJ-Access-Token': accessToken },
            },
          )
          .toPromise();
        const { data: comments } = await this.httpService
          .get(
            'https://developers.cjdropshipping.com/api2.0/v1/product/productComments',
            {
              params: { pid: product.pid },
              headers: { 'CJ-Access-Token': accessToken },
            },
          )
          .toPromise();
        const deleteCol = [
          'productName',
          'productNameSet',
          'entryName',
          'materialName',
          'materialNameSet',
          'packingName',
          'packingNameSet',
          'productKey',
          'productKeySet',
          'productPro',
          'productProSet',
        ];
        delete product.productName;
        for (const col of deleteCol) {
          delete details.data[col];
        }

        await this.client
          .send('product', {
            productData: { ...product, ...details.data },
            comments: comments,
          })
          .toPromise();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder(orderData: CreateOrderDto) {
    try {
      const { accessToken } = await this.knex.table('session').first();
      const { data } = await this.httpService
        .post(
          'https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder',
          {
            headers: {
              'CJ-Access-Token': accessToken,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      const newOrder = await this.knex
        .table('orders')
        .insert(orderData)
        .returning('*');
      console.log(data);
      return newOrder;
    } catch (error) {
      if (error.response?.status === 401) {
        await this.authService.refreshAccessToken();
        return await this.createOrder(orderData);
      }
      console.log(error);
    }
  }
}
