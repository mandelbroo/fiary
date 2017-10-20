switch (process.env.NODE_ENV) {
  case 'development':
  case undefined:
    require('dotenv').config()  // Load .env configs
    break
}

const config = require('../knexfile.js')[process.env.NODE_ENV]

let connection = require('knex')(config)

connection.authenticate = function() {
  return this.raw('SELECT 1 AS result')
}

module.exports = connection
