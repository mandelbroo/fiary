const express = require('express')
const api = express.Router()
const main = express.Router()
const authorize = require('./middleware/authorize').default
const bodyParser = require('body-parser')
const path = require('path')

const entriesController = require('./controllers/entries')
const recordsController = require('./controllers/records')
const usersController = require('./controllers/users')
const tagsController = require('./controllers/tags')
const stats = require('./controllers/stats')

const routesPublic = require('./routes-public')

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(routesPublic)
api.use(authorize)

api.get('/monthly', stats.monthly)
api.get('/annual', stats.annual)
api.get('/entries', entriesController.getAll)
api.get('/entries/:id(\\d+)/', entriesController.getById)
api.get(
  '/entries/:isoDate(\\d{4}-\\d{2}-\\d{2})/',
  entriesController.getIdByDate
)

api.post('/records', recordsController.post)
api.patch('/records', recordsController.update)
api.delete('/records/:id(\\d+)/', recordsController.destroy)

api.get('/users', usersController)

api.get('/tags', tagsController.get)

if (process.env.NODE_ENV === 'test') {
  main.get('/with-error', (req, res) => {
    req.undefinet.method
  })
}
main.get('/*', (req, res) => {
  res.header('X-Frame-Options', 'Allow')
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

const router = express.Router()
router.use('/api', api)
router.use(main)

module.exports = router
