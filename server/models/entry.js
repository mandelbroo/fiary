const { createModel } = require('./base')

const Entry = createModel('Entry', {
	tableName: 'entries',
	records: function () { return this.hasMany('Record') }
})

module.exports = Entry
