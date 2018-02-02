const { createModel, bookshelf } = require('./base')

const Record = createModel('Record', {
  tableName: 'records',
  entry: function () { return this.belongsTo('Entry') },
  recordsTags: function () { return this.hasMany('RecordTag') },
  tags: function () { return this.belongsToMany('Tag').through('RecordTag') },
  constructor: function() {
    bookshelf.Model.apply(this, arguments)
    Object.assign(this, this.attributes)
    Object.defineProperty(this, 'income', {
      get: () => this.get('kind') === 'income'
    })
  }
})

module.exports = Record
