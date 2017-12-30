const recordsAdd = require('../services/records-add')

exports.post = (req, res, next) => {
  req.currentUserPromise.then(user => {
    const data = Object.assign({user: user}, req.body)
    recordsAdd.execute(data)
      .then(entry => {
        res.send({success: true, message: 'records added'})
      })
      .catch(err => {
        if (err instanceof recordsAdd.Error)
          res.status(422).send({success: false, message: err.message})
        else
          next(err)
      })
  })
}
