const express = require('express')
const api = express.Router()
const main = express.Router()
const authorize = require('../middleware/authorize').default
const bodyParser = require('body-parser')
const path = require('path')
const entriesController = require('./entries')
const recordsController = require('./records')

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(require('./public'))
api.use(authorize)

api.get('/entries', entriesController.getAll)
api.get('/entries/:id(\\d+)/', entriesController.getById)
api.get('/entries/:isoDate(\\d{4}-\\d{2}-\\d{2})/', entriesController.getIdByDate)

api.post('/records', recordsController.post)
api.delete('/records/:id(\\d+)/', recordsController.destroy)

api.get('/users', require('./users'))

api.get('/tags', require('./tags').get)

if (process.env.NODE_ENV === 'test') {
  main.get('/with-error', (req, res) => {
    req.undefinet.method
  })
}
main.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
})

const router = express.Router()
router.use('/api', api)
router.use(main)

module.exports = router
