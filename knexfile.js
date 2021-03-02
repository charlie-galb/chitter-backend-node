const pg = require('pg')

if (process.env.NODE_ENV === 'production') pg.defaults.ssl = { rejectUnauthorized: false }

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'chitter_dev',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
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
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }

}
