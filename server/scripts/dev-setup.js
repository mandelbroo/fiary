const connection = require('../../db/connection')
const logger = require('morgan-body')

module.exports = (app) => {
  logger(app)
  connection
    .authenticate()
    .then(() => console.log('DB connection: OK'))
    .catch(err => console.error('DB connection: Error', err))
}
