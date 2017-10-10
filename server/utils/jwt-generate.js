const jwt = require('jsonwebtoken')
const JWT_WHITELIST = ['id', 'username', 'email', 'role']

function sanitize(obj, whitelist) {
  return Object.keys(obj)
      .filter(key => whitelist.includes(key))
      .reduce((newObj, key) => {
        newObj[key] = obj[key]
        return newObj
      }, {})
}

module.exports = (user) => {
  if (user) {
    const userInfo = sanitize(user, JWT_WHITELIST)
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {expiresIn: 86400})
    return `Bearer ${token}`
  }
}
