const bcrypt = require('bcrypt')
const User = require('../../models/user')
const jwtGenerate = require('../../utils/jwt-generate')

module.exports = (req, res) => {
	User.encryptPassword(req.body.password).then(crypted => {
		User.create({
				username: req.body.username,
				email: req.body.email,
				password: crypted,
				role: 'user'
			})
			.then(user => {
				const token = jwtGenerate(user.attributes)
				res.send({
					success: true,
					message: 'User created successfully',
					token: token,
					user: {
						id: user.attributes.id,
						name: user.attributes.username,
					}
				})
			})
			.catch(err => res.send({success: false, message: err}))
	})
}
