const jwt = require('jsonwebtoken')
const {User} = require('../models')

exports.default = (req, res, next) => {
  const token = getToken(req)
  if (token) {
    const payload = getPayload(token, req)
    if (payload) {
      setCurrentUser(req, payload)
      next()
      return
    }
  }
  if (req.baseUrl.includes('/api'))
    res.status(401).send({success: false, message: 'Not authorized. Missing or invalid token'})
  else
    next()
}

function getPayload(token, req) {
  if (!token || token == '')
    return
  let payload = false
  const plainToken = token.replace('Bearer ', '')
  try {
    payload = jwt.verify(plainToken, process.env.JWT_SECRET)
  } catch(err) {
    console.error(err.message, `${plainToken}`, `ip: ${req.connection.remoteAddress}`)
  }
  return payload
}

exports.getPayload = getPayload

function getToken(req) {
  let token = req.get('Authorization')
  if (!token && req.params && req.params.bearer)
    token = req.params.bearer.token
  return token
}

exports.getToken = getToken

function setCurrentUser(req, payload) {
  req.currentUserPromise = User
    .findById(payload.id)
    .then(result => {
      if (result)
        req.currentUser = result.dataValues
    })
    .error(err => console.error(err))
}
