const Base = require('./base')
const Record = require('./record')
const Tag = require('./tag')

class RecordTag extends Base {
  get tableName() {return 'records_tags'}

  record() {
    return this.hasOne(Record)
  }
  tag() {
    return this.hasOne(Tag)
  }
}
module.exports = RecordTag
