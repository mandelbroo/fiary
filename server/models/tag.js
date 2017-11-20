const Base = require('./base')
const {Record, RecordTag} = require('./')

class Tag extends Base {
  get tableName() {return 'tags'}

  records() {
    return this.belongsToMany(Record).through(RecordTag)
  }
}
module.exports = Tag
