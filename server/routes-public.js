const router = require('express').Router()
const validate = require('express-validation')
const validators = require('./validators')
const signin = require('./controllers/public/signin')
const signup = require('./controllers/public/signup')

router.post('/signin', validate(validators.signin), signin)
router.post('/signup', validate(validators.signup), signup)

module.exports = router
