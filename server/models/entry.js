const Base = require('./base')
const Record = require('./record')

class Entry extends Base {
  get tableName() { return 'entries' }
  get day() { return this.attributes.day }
  get userId() { return this.attributes.userId }

  records() { return this.hasMany(Record) }
}
module.exports = Entry
