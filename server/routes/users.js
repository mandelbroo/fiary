const models = require('../models')

module.exports = (req, res) => {
  models.user.findAll().then(users => {
    res.send(users)
  })
}
