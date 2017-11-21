const {recordsAdd, RecordsServiceError} = require('../services/records-service')

exports.postRecords = (req, res, next) => {
  req.currentUserPromise.then(user => {
    const data = Object.assign({user: user}, req.body)
    recordsAdd(data)
      .then(entry => {
        res.send({success: true, message: 'records added'})
      })
      .catch(err => {
        if (err instanceof RecordsServiceError)
          res.status(422).send({success: false, message: err.message})
        else
          next(err)
      })
  })
}
