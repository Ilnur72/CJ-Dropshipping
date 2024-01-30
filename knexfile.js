  // Update with your config settings.
  
  /**
   * @type { Object.<string, import("knex").Knex.Config> }
   */
  module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '8808',
        database: 'cjdropshipping',
        charset: 'utf8',
      },
      migrations: {
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds',
      },
    },

    staging: {
      client: 'postgresql',
      connection: {
        database: 'cjdropshipping',
        user: 'postgres',
        password: '8808',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    },

    production: {
      client: 'postgresql',
      connection: {
        database: 'cjdropshipping',
        user: 'postgres',
        password: '8808',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  };
