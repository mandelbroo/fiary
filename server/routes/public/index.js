const router = require('express').Router()
const validate = require('express-validation')
const validators = require('../../validators')

router.post('/signin', validate(validators.signin), require('./signin'))
router.post('/signup', validate(validators.signup), require('./signup'))

module.exports = router
