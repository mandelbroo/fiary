const knex = require('../../db/connection')
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('bookshelf-camelcase')
bookshelf.plugin('pagination')
bookshelf.plugin(require('bookshelf-modelbase').pluggable)
bookshelf.plugin('registry')

bookshelf.model('Base', bookshelf.Model.extend({
  hasTimestamps: true,
  connection: knex,
  constructor: function() {
    bookshelf.Model.apply(this, arguments)
    Object.assign(this, this.attributes)
  }
}))

module.exports.createModel = (name, protoAttrs, classAttrs) =>
  bookshelf.model(name, bookshelf.model('Base').extend(protoAttrs, classAttrs))
module.exports.bookshelf = bookshelf
