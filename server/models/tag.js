const { createModel, bookshelf } = require('./base')

const Tag = createModel('Tag', {
	tableName: 'tags',
	recordsTags: function () { return this.hasMany('RecordTag') },
	records: function () { return this.belongsToMany('Record').through('RecordTag') },
	constructor: function() {
		bookshelf.Model.apply(this, arguments)
		Object.assign(this, this.attributes)
		this.getter('recordId', 'recordId')
		this.getter('tagId', 'tagId')
	}
})
module.exports = Tag
