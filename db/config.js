switch (process.env.NODE_ENV) {
  case 'development':
  case 'test':
  case undefined:
    require('dotenv').config()
    break
}

const HOST = process.env.DB_HOST || 'localhost'
const DIALECT = 'postgres'
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASS
const DBNAME = process.env.DB_NAME

module.exports = {
  development: {
    database: DBNAME || 'fiary_dev',
    dialect: DIALECT,
    host: HOST,
    user: USER,
    username: USER,
    password: PASSWORD
  },
  production: {
    database: DBNAME || 'fiary_prod',
    dialect: DIALECT,
    host: HOST,
    user: 'postgres',
    username: 'postgres',
    password: 'verysecret'
  },
  test: {
    database: DBNAME || 'fiary_test',
    dialect: DIALECT,
    host: HOST,
    user: USER,
    username: USER,
    password: PASSWORD,
    logging: false
  }
}
