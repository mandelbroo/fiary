const Base = require('./base')
const {Record, Tag} = require('./')

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
