import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class TypesenseService {
  constructor(
    @Inject('TYPESENSE') private readonly client: ClientProxy,
    @InjectModel() private readonly knex: Knex,
  ) {}

  async sendProduct() {
    try {
      const total = await this.knex.table('product').clone().count().first();
      let length = Math.ceil(total.count / 100);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let limit = 1; limit <= length; limit++) {
        await delay(5000);
        const data = await this.knex
          .table('product')
          .leftJoin('variants', 'product.pid', 'variants.pid')
          .select(
            'product.*',
            this.knex.raw('JSON_AGG(variants.*) as variants'),
          )
          .groupBy('product.id')
          .limit(100)
          .offset((limit - 1) * 100);
        console.log(limit);

        for (const product of data) {
          const comments = await this.knex
            .table('comments')
            .where({ pid: 'product.pid' });
          await this.client
            .send('typesense', { product, comments })
            .toPromise();
        }
      }
      return 'successfully';
    } catch (error) {
      console.log(error);
    }
  }
}
