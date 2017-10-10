const bcrypt = require('bcrypt')
const {user} = require('../../models')
const jwtGenerate = require('../../utils/jwt-generate')

module.exports = (req, res) => {
  user.encryptPassword(req.body.password).then(crypted => {
    user
      .create({
        username: req.body.username,
        email: req.body.email,
        password: crypted,
        role: 'user'
      })
      .then(({dataValues}) => {
        const token = jwtGenerate(dataValues)
        res.send({
          success: true,
          message: 'User created successfully',
          token: token,
          user: {
            id: dataValues.id,
            name: dataValues.username,
          }
        })
      })
      .error(err => res.send({success: false, message: err}))
  })
}
