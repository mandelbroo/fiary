const { createModel } = require('./base')

const Tag = createModel('Tag', {
  tableName: 'tags',
  recordsTags: function () { return this.hasMany('RecordTag') },
  records: function () { return this.belongsToMany('Record').through('RecordTag') },
})
module.exports = Tag
