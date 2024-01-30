/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.uuid('pid').primary().unique();
    table.string("dropshippingProvider").notNullable();
    table.specificType('productName', 'TEXT[]');
    table.string('productNameEn');
    table.string('productSku');
    table.string('productImage');
    table.float('productWeight');
    table.string('productType');
    table.string('productUnit');
    table.string('categoryName');
    table.integer('listingCount');
    table.float('sellPrice');
    table.string('remark');
    table.string('addMarkStatus');
    table.timestamp('createTime');
    table.string('isVideo');
    table.integer('saleStatus');
    table.integer('listedNum');
    table.string('supplierName');
    table.uuid('supplierId');
    table.uuid('categoryId').references('categoryId').inTable('category').onDelete('CASCADE');
    table.string('sourceFrom');
    table.specificType('shippingCountryCodes', 'TEXT[]');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
