const jwt = require('jsonwebtoken')
const {User} = require('../models')

exports.default = (req, res, next) => {
  const payload = getPayload(req)
  if (payload) {
    req.currentUserPromise = User.findById(payload.id)
      .then(user => {
        req.currentUser = user
        next()
      })
      .catch(err => res.status(401)
        .send({ success: false, message: 'Not authorized. User not found' }))
  } else
    res.status(401).send({success: false, message: 'Not authorized. Missing or invalid token'})
}

function getPayload(req) {
  const token = getToken(req)
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
