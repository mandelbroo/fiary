const logger = require('morgan-body')

module.exports = (app) => {
  if (process.env.LOGGER) logger(app)
}
