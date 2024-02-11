/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('variant-groups', function (table) {
    table.uuid('gid').primary()
    table.string('pid').references('pid').inTable('product').notNullable();
    table.string('groupName').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('variant-groups');
};
