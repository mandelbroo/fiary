const { createModel } = require('./base')

const RecordTag = createModel('RecordTag', {
	tableName: 'records_tags',
	record: function () { return this.belongsTo('Record') },
	tag: function () { return this.belongsTo('Tag') },
})

module.exports = RecordTag
