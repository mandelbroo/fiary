const models = require('../models')

module.exports = (req, res) => {
  models.User.findAll()
    .then(users => {
      let newCollection = users.map(user => {
        user.attributes.createdAt = user.attributes.created_at
        delete user.attributes.created_at
        return user
      })
      res.send(newCollection)
    })
}
