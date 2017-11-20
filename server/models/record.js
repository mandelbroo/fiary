const Base = require('./base')
const {Entry, RecordTag, Tag} = require('./')

class Record extends Base {
  get tableName() {return 'records'}

  entry() {
    return this.belongsTo(Entry)
  }

  tags() {
    return this.hasMany(Tag)
  }
}
module.exports = Record
