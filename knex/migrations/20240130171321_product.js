/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('product', function (table) {
    table.string('pid').primary().unique();
    table.string('dropshippingProvider').notNullable();
    table.string('productNameEn');
    table.string('productSku');
    table.text('productImage');
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
    table.text('remark');
    table.integer('addMarkStatus');
    table.date('createTime');
    table.string('isVideo');
    table.integer('saleStatus');
    table.integer('listedNum');
    table.string('supplierName');
    table.string('supplierId');
    table.string('sourceFrom');
    table.specificType('shippingCountryCodes', 'TEXT[]');
    table.string('entryCode');
    table.string('entryNameEn');
    table.string('materialNameEn');
    table.specificType('materialNameEnSet', 'TEXT[]');
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
    table.date('createrTime');
    table.string('productVideo');
    table.string('status');
    table.string('suggestSellPrice');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('product');
};
