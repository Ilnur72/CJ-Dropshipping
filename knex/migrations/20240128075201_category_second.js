/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category_second', function (table) {
    table.uuid('categorySecondId').primary().unique().notNullable();
    table.string('categorySecondName').primary().notNullable();
    table.uuid('categoryFirstId').references('categoryFirstId').inTable('category_first').onDelete('CASCADE').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('category_second');
};
