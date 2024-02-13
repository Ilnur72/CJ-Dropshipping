import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import slugify from 'slugify';

@Injectable()
export class ConsumerService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async saveProducts({ productData, comments }) {
    try {
      const productClone = { ...productData };
      delete productClone.variants;

      await this.knex.table('product').insert({
        ...productClone,
        dropshippingProvider: 'CJDropshipping',
        slug: slugify(productClone.productNameEn),
        createTime: new Date(productClone.createTime).toISOString(),
      });

      if (comments.data.list) {
        for (const comment of comments.data.list) {
          await this.knex.table('comments').insert(comment);
        }
      }

      for (const variant of productData.variants) {
        delete variant.variantName;
        await this.knex.table('variants').insert({
          ...variant,
          createTime: new Date(variant.createTime).toISOString(),
        });
      }
    } catch (error) {
      if (error.code === '23505') console.log(error.detail);
      else console.log(error);
    }
  }
}
