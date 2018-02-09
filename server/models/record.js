const { createModel, bookshelf } = require('./base')

const Record = createModel('Record', {
  tableName: 'records',
  entry: function () { return this.belongsTo('Entry') },
  recordsTags: function () { return this.hasMany('RecordTag') },
  tags: function () { return this.belongsToMany('Tag').through('RecordTag') },
  constructor: function() {
    bookshelf.Model.apply(this, arguments)
    Object.assign(this, this.attributes)
    this.getter('amount', 'amount', parseFloat)
    this.getter('entryId', 'entryId')
    this.getter('income', 'income')
  }
}, {
  dependents: ['recordsTags']
})

module.exports = Record
