// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'tangent'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'tangent_test'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      password: 'password',
      user: 'username',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      max: 10,
      min: 2,
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      password: 'password',
      user: 'username',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      max: 10,
      min: 2,
    },
  }
};
