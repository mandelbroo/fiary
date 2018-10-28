const jwt = require('jsonwebtoken')
const JWT_WHITELIST = ['id', 'username', 'email', 'role']
const EXPIRE_IN = 28 * 24 * 60 * 60

function sanitize(obj, whitelist) {
  return Object.keys(obj)
    .filter((key) => whitelist.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}

module.exports = (user) => {
  if (user) {
    const userInfo = sanitize(user, JWT_WHITELIST)
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: EXPIRE_IN,
    })
    return `Bearer ${token}`
  }
}
