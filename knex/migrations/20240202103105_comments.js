/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.string('commentId').unique().primary();
    table.string('pid').references('pid').inTable('product');
    table.text('comment');
    table.date('commentDate');
    table.string('commentUser');
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
exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
