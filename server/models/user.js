const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  })
  user.prototype.isValidPass = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  user.encryptPassword = function(password) {
    return bcrypt.hash(password, 10)
  }
  return user
}
