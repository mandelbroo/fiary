const bcrypt = require('bcrypt')
const Base = require('./base')
const Entry = require('./entry')

class User extends Base {
  get tableName() {return 'users'}

  static encryptPassword(password) {
    return bcrypt.hash(password, 10)
  }

  entries() {
    return this.hasMany(Entry)
  }
  isValidPass(password) {
    return bcrypt.compareSync(password, this.attributes.password)
  }
}

module.exports = User
