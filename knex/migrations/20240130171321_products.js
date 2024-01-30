/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.uuid('pid').primary().unique();
    table.string('dropshippingProvider').notNullable();
    table.string('productNameEn');
    table.string('productSku');
    table.string('productImage');
    table.specificType('productImageSet', 'TEXT[]');
    table.string('productWeight');
    table.string('productType');
    table.string('productUnit');
    table
      .string('categoryId')
      .references('categoryId')
      .inTable('category')
      .onDelete('CASCADE');
    table.string('categoryName');
    table.integer('listingCount');
    table.string('sellPrice');
    table.string('remark');
    table.integer('addMarkStatus');
    table.date('createTime');
    table.string('isVideo');
    table.integer('saleStatus');
    table.integer('listedNum');
    table.string('supplierName');
    table.uuid('supplierId');
    table.string('sourceFrom');
    table.specificType('shippingCountryCodes', 'TEXT[]');
    table.string('entryCode');
    table.string('entryNameEn');
    table.string('materialNameEn');
    table.specificType('materialNamEnSet', 'TEXT[]');
    table.string('materialKey');
    table.specificType('materialKeySet', 'TEXT[]');
    table.string('packingWeight');
    table.string('packingNameEn');
    table.specificType('packingNameEnSet', 'TEXT[]');
    table.string('packingKey');
    table.specificType('packingKeySet', 'TEXT[]');
    table.string('productKeyEn');
    table.string('productProEn');
    table.specificType('productProEnSet', 'TEXT[]');
    table.text('description');
    table.date('createrDate');
    table.string('productVideo');
    table.string('status');

    //!variant [massiv]
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
