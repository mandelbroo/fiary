const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize').default
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(require('./public'))
router.use(authorize)
router.get('/users', require('./users'))

module.exports = router
