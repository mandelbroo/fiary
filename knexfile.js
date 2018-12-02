module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: process.env.DB_NAME || 'fiary_dev',
      host: process.env.DB_HOST || '127.0.0.1',
      password: process.env.DB_PASS || 'verysecret',
      user: process.env.DB_USER || 'fiary',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },

  test: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: process.env.DB_NAME || 'fiary_test',
      host: process.env.DB_HOST || '127.0.0.1',
      password: process.env.DB_PASS || 'verysecret',
      user: process.env.DB_USER || 'fiary',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: process.env.DB_NAME || 'fiary_prod',
      host: process.env.DB_HOST || '127.0.0.1',
      password: process.env.DB_PASS || 'verysecret',
      user: process.env.DB_USER || 'fiary',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },
}
