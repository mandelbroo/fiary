const User = require('../models/user')
const apiRes = require('./api-response')

module.exports = (req, res) => {
	User.fetchPage({
			pageSize: 15,
			page: 1,
		})
		.then(users => res.send(apiRes(users)))
}
