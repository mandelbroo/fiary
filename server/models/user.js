const { createModel } = require('./base')
const bcrypt = require('bcrypt')

const User = createModel('User', {
  tableName: 'users',
  entries: function () { return this.hasMany('Entry') },
  isValidPass: function (password) {
    return bcrypt.compareSync(password, this.get('password'))
  }
}, {
  encryptPassword: (password) => bcrypt.hash(password, 10)
})
module.exports = User
