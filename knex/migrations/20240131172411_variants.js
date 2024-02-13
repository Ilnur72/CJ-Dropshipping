/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('variants', function (table) {
    table.string('vid').primary().unique().notNullable();
    table.string('pid').references('pid').inTable('product').notNullable();
    // table.string('gid').references('gid').inTable('variant-groups').notNull
    table.string('variantNameEn');
    table.string('variantImage');
    table.string('variantSku');
    table.string('variantUnit');
    table.string('variantProperty');
    table.string('variantKey');
    table.integer('variantLength');
    table.integer('variantWidth');
    table.integer('variantHeight');
    table.integer('variantVolume');
    table.float('variantWeight');
    table.float('variantSellPrice');
    table.date('createTime');
    table.string('variantStandard');
    table.float('variantSugSellPrice');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('variants');
};
