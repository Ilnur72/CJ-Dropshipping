/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category', function (table) {
    table.string('categoryId').primary().unique().notNullable();
    table.string('categoryName').primary().notNullable();
    table.uuid('categorySecondId').references('categorySecondId').inTable('category_second').onDelete('CASCADE').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('category');
};
