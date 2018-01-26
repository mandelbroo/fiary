const Base = require('./base')
const Entry = require('./entry')
const RecordTag = require('./record-tag')
const Tag = require('./tag')

class Record extends Base {
  get tableName() {return 'records'}
  get amount() { return this.attributes.amount }
  get entryId() { return this.attributes.entryId }
  get income() { return (this.kind || this.attributes.kind) === 'income' ? true : false }

  entry() { return this.belongsTo(Entry) }
  recordsTags() { return this.hasMany(RecordTag) }
  tags() { return this.belongsToMany(Tag).through(RecordTag) }
}
module.exports = Record
