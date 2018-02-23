const { createModel, bookshelf } = require('./base')

const Entry = createModel('Entry', {
	tableName: 'entries',
	records: function () { return this.hasMany('Record') },
	constructor: function() {
		bookshelf.Model.apply(this, arguments)
		Object.assign(this, this.attributes)
		this.getter('day', 'day')
	}
})

module.exports = Entry
