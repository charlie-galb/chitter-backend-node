// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'chitter_dev',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user:      process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: {
      database: 'chitter_test',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user:      process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }

};