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

if (process.env.NODE_ENV === 'test') {
  main.get('/with-error', (req, res) => {
    req.undefinet.method
  })
}
main.get('/*', (req, res) => {
  console.log('sending index.html')
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
})

const router = express.Router()
router.use('/api', api)
router.use('/', main)

module.exports = router
