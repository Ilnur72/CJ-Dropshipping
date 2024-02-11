/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable('comment', function (table) {
    table.uuid('commentId').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('pid').unique().references('pid').inTable('product');
    table.date('commentDate');
    table.string('commentuser');
    table.integer('score');
    table.specificType('commentUrls', 'TEXT[]');
    table.string('countryCode');
    table.text('flagIconUrl');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
