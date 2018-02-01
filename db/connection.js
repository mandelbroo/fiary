if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const config = require('../knexfile.js')[process.env.NODE_ENV]
const connection = require('knex')(config)

module.exports = connection
