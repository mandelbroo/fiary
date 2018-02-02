const { createModel, bookshelf } = require('./base')

const Tag = createModel('Tag', {
  tableName: 'tags',
  recordsTags: function () { return this.hasMany('RecordTag') },
  records: function () { return this.belongsToMany('Record').through('RecordTag') },
  constructor: function() {
    bookshelf.Model.apply(this, arguments)
    Object.assign(this, this.attributes)
    Object.defineProperty(this, 'recordId', {
      get: () => this.get('recordId')
    })
    Object.defineProperty(this, 'tagId', {
      get: () => this.get('tagId')
    })
  }
})
module.exports = Tag
