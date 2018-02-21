const joi = require('joi')

module.exports = {
	options: {
		allowUnknownBody: false,
		contextRequest: true
	},
	body: {
		email: joi.string().email().required(),
		username: joi.string().min(4).max(30).required(),
		password: joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{8,30}/).required()
	}
}
