const {user} = require('../models')

module.exports = () => {
  user.destroy({
    where: {},
    truncate: true
  })
}
