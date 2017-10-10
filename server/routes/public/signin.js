const models = require('../../models')
const jwtGenerate = require('../../utils/jwt-generate')

module.exports = (req, res) => {
  models.user.findOne({ where: { email: req.body.email }})
    .then(user => {
      if (!user)
        res.status(401).send({ success: false, message: 'User not found' })
      else if (!user.isValidPass(req.body.password))
        res.status(401).send({ success: false, message: 'Wrong credentials' })
      else {
        const token = jwtGenerate(user)
        res.send({
          success: true,
          message: 'Authenticated successfully',
          token: token,
          user: {
            id: user.id,
            name: user.username,
          }
        })
      }
    })
}
