const joi = require('joi')

module.exports = {
  options: { allowUnknownBody: false },
  body: {
    email: joi.string().email().required(),
    password: joi.string().required()
  }
}
