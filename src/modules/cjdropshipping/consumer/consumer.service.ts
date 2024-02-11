import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class ConsumerService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  // async saveCategory(categoryData): Promise<void> {
  //   try {
  //     for (const categoryFirst of categoryData) {
  //       await this.knex.table('category').insert({
  //         categoryId: categoryFirst.categoryFirstId,
  //         categoryName: categoryFirst.categoryFirstName,
  //       });
  //       for (const categorySecond of categoryFirst.categoryFirstList) {
  //         await this.knex.table('category').insert({
  //           categoryId: categorySecond.categorySecondId,
  //           categoryName: categorySecond.categorySecondName,
  //           parentId: categoryFirst.categoryFirstId,
  //         });
  //         for (const category of categorySecond.categorySecondList) {
  //           await this.knex.table('category').insert({
  //             categoryId: category.categoryId,
  //             categoryName: category.categoryName,
  //             parentId: categorySecond.categorySecondId,
  //           });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async saveProducts({ productData, comments }) {
    try {
      const productClone = { ...productData };
      delete productClone.variants;

      await this.knex.table('product').insert({
        ...productClone,
        dropshippingProvider: 'CJDropshipping',
        createTime: new Date(productClone.createTime).toISOString(),
      });

      if (comments.list) {
        for (const comment of comments.list) {
          await this.knex.table('comment').insert(comment);
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
