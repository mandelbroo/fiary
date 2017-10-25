const {User} = require('../models')
const apiRes = require('./api-response')

module.exports = (req, res) => {
  User.fetchPage({
      pageSize: 15,
      page: 1,
    })
    .then(users => res.send(apiRes(users)))
}
