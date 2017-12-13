const express = require('express')
const api = express.Router()
const main = express.Router()
const authorize = require('../middleware/authorize').default
const bodyParser = require('body-parser')
const path = require('path')

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(require('./public'))
api.use(authorize)
api.get('/users', require('./users'))
api.get('/entries', require('./entries'))
api.post('/records', require('./records').postRecords)

if (process.env.NODE_ENV === 'test') {
  main.get('/with-error', (req, res) => {
    req.undefinet.method
  })
}
main.get('/*', (req, res, next) => {
  if (req.method === 'GET') {
    if (process.env.NODE_ENV === 'test') res.send('sending index.html')
    else res.sendFile(path.resolve(__dirname, '../../build/index.html'))
  }
  next()
})

const router = express.Router()
router.use('/api', api)
router.use(main)

module.exports = router
