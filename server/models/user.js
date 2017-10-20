const bcrypt = require('bcrypt')
const Base = require('./base');

class User extends Base {
  get tableName() {return 'users'}

  static encryptPassword(password) {
    return bcrypt.hash(password, 10)
  }

  isValidPass(password) {
    return bcrypt.compareSync(password, this.attributes.password)
  }
}

module.exports = User
