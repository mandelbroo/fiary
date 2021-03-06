const knex = require('../../db/connection')
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('bookshelf-camelcase')
bookshelf.plugin('pagination')
bookshelf.plugin(require('bookshelf-modelbase').pluggable)
bookshelf.plugin('registry')
bookshelf.plugin(require('bookshelf-cascade-delete'))

bookshelf.model('Base', bookshelf.Model.extend({
	hasTimestamps: true,
	constructor: function() {
		bookshelf.Model.apply(this, arguments)
		Object.assign(this, this.attributes)
	},
	getter: function(name, attrName, filter) {
		Object.defineProperty(this, name, {
			get: () => {
				const value = this.get(attrName)
				return filter ? filter(value) : value
			}
		})
	}
}, {
	connection: knex
}))

module.exports.createModel = (name, protoAttrs, classAttrs) =>
	bookshelf.model(name, bookshelf.model('Base').extend(protoAttrs, classAttrs))
module.exports.bookshelf = bookshelf
