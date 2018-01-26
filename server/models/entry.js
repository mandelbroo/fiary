const Base = require('./base')
const Record = require('./record')

class Entry extends Base {
  get tableName() {return 'entries'}

  records() { return this.hasMany(Record) }
}
module.exports = Entry
