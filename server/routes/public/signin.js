const User = require('../../models/user')
const jwtGenerate = require('../../utils/jwt-generate')

module.exports = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user.isValidPass(req.body.password))
				res.status(401).send({ success: false, message: 'Wrong credentials' })
			else {
				const token = jwtGenerate(user.attributes)
				res.send({
					success: true,
					message: 'Authenticated successfully',
					token: token,
					user: {
						id: user.attributes.id,
						name: user.attributes.username,
					}
				})
			}
		})
		.catch(err => {
			if (err.message === 'EmptyResponse')
				res.status(401).send({ success: false, message: 'User not found' })
			else
				throw err
		})
}
