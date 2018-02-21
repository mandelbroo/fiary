const tagsService = require('../services/tags')

module.exports = {
	get: async (req, res) => {
		const tags = await tagsService.like(req.query.like)
		res.send(tags)
	}
}
