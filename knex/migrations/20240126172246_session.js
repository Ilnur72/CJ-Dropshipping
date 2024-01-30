/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('session', function (table) {
    table.integer('openId').notNullable();
    table.text('accessToken').notNullable();
    table.string('accessTokenExpiryDate', 200).notNullable();
    table.text('refreshToken').notNullable();
    table.string('refreshTokenExpiryDate', 200).notNullable();
    table.string('createDate', 200).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('session');
};
