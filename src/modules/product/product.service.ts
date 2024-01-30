import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private httpServie: HttpService,
    private authService: AuthService,
  ) {}

  async getCategory() {
    try {
      const { accessToken } = await this.knex.table('session').first();
      const url =
        'https://developers.cjdropshipping.com/api2.0/v1/product/getCategory';
      const {
        data: { data },
      } = await this.httpServie
        .get(url, { headers: { 'CJ-Access-Token': accessToken } })
        .toPromise();

      for (const categoryFirst of data) {
        await this.knex.table('category_first').insert({
          categoryFirstId: categoryFirst.categoryFirstId,
          categoryFirstName: categoryFirst.categoryFirstName,
        });

        for (const categorySecond of categoryFirst.categoryFirstList) {
          await this.knex.table('category_second').insert({
            categorySecondId: categorySecond.categorySecondId,
            categorySecondName: categorySecond.categorySecondName,
            categoryFirstId: categoryFirst.categoryFirstId,
          });
          for (const category of categorySecond.categorySecondList) {
            await this.knex.table('category').insert({
              categoryId: category.categoryId,
              categoryName: category.categoryName,
              categorySecondId: categorySecond.categorySecondId,
            });
          }
        }
      }
      return 'Successfully';
    } catch (error) {
      if (error.response?.status === 401) {
        await this.authService.refreshAccessToken();
        return await this.getCategory();
      }
    }
  }

  async getProducts() {
    try {
      const { accessToken } = await this.knex.table('session').first();
      const url =
        'https://developers.cjdropshipping.com/api2.0/v1/product/list?pageSize=200';
      // const {
      //   data: { data },
      // } = await this.httpServie
      //   .get(url, { headers: { 'CJ-Access-Token': accessToken } })
      //   .toPromise();
      // const totalRequest = Math.ceil(data.total / data.pageSize);
      
      for (let page = 1; page <= 1; page++) {
        const { data } = await this.httpServie
          .get(url, {
            params: { pageNum: page },
            headers: { 'CJ-Access-Token': accessToken },
          })
          .toPromise();
        for (const productData of data.list) {
          delete productData.productName;
          await this.knex.table('products').insert({
            dropshippingProvider: 'cjdropshipping',
            productData: productData,
          });
        }
      }
      return 'successfully created';
    } catch ({ response }) {
      if (response.status === 401) {
        await this.authService.refreshAccessToken();
        return await this.getProducts();
      }
    }
  }
}
