const Base = require('./base')
const Record = require('./record')
const RecordTag = require('./record-tag')

class Tag extends Base {
  get tableName() {return 'tags'}

  recordsTags() { return this.hasMany(RecordTag) }
  records() { return this.belongsToMany(Record).through(RecordTag) }
}
module.exports = Tag
