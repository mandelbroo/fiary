const ValidationError = require('express-validation').ValidationError

module.exports = [
	function(err, req, res, next) {
		if (err instanceof ValidationError) {
			res.status(400).json({success: false, message: 'Bad request', errors: err.errors})
		} else {
			next(err)
		}
	},
	function (err, req, res, next) {
		if (process.env.NODE_ENV !== 'test')
			console.error(err.stack)
		res.status(500).json({success: false, message: 'Internal server error'})
	}
]
