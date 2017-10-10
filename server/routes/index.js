const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize').default

router.use(require('./public'))
console.log('--- router index')
router.use(authorize)
router.get('/users', require('./users'))

module.exports = router
