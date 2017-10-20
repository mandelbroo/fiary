const knex = require('../../db/connection')
const bookshelf = require('bookshelf')(knex)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

module.exports = class Base extends bookshelf.Model {
  get hasTimestamps() {return true}

  get createdAt() {
    return this.get('created_at')
  }

  get updatedAt() {
    return this.get('updated_at')
  }
}
