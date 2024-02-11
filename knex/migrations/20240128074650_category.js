/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category', function (table) {
    table.string('categoryId').primary().unique();
    table.string('categoryName');
    table.string('parentId');
    table.foreign('parentId').references('categoryId').inTable('category');
    // table.foreign('categoryId').references('categoryId').inTable('product');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('category');
};
