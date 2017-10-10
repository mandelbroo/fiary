const router = require('express').Router()
const validate = require('express-validation')
const validators = require('../../validators')

console.log('--- public path')

router.post('/signin', validate(validators.signin), require('./signin'))
router.post('/signup', validate(validators.signup), require('./signup'))

module.exports = router
