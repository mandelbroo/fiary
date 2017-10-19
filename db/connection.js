switch (process.env.NODE_ENV) {
  case 'development':
  case undefined:
    require('dotenv').config()  // Load .env configs
    break
}

const knex = require('knex')

let connection = knex(require('../knexfile.js')[process.env.NODE_ENV])

connection.authenticate = function() {
  return this.raw('SELECT 1 AS result')
}

module.exports = connection
