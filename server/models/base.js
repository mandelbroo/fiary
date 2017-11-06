const knex = require('../../db/connection')
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('bookshelf-camelcase')
bookshelf.plugin('pagination')
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

module.exports = class Base extends bookshelf.Model {
  get hasTimestamps() {return true}
  static get connection() {
    return knex
  }
}
