/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable('orders', function (table) {
    table.uuid('commentId').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('orderNumber').notNullable();
    table.string('shippingZip');
    table.string('shippingCountryCode');
    table.string('shippingCountry');
    table.string('shippingProvince');
    table.string('shippingCity');
    table.string('shippingAddress');
    table.string('shippingCustomerName');
    table.string('shippingPhone');
    table.string('remark');
    table.string('fromCountryCode');
    table.string('logisticName');
    table.string('houseNumber');
    table.string('email');
    table.jsonb('products');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
