const config = require('./config.js')[process.env.NODE_ENV]
const Sequelize = require('sequelize')

module.exports = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    port: config.port,
    max: 5,
    min: 0,
    idle: 10000
  },
})
