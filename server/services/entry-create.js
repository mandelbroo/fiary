const Entry = require('../models/entry')

module.exports = (params, user) => {
	return Entry.create({ ...params, userId: user.id })
}
