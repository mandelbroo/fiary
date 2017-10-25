const Base = require('./base')
const Tag = require('./tag')

class Record extends Base {
  get tableName() {return 'records'}

  tags() {
    return this.hasMany(Tag)
  }
}
module.exports = Record
