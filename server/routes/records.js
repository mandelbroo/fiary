const recordsAdd = require('../services/records-add')
const Record = require('../models/record')

exports.post = (req, res, next) => {
  recordsAdd.execute(req.body)
    .then(record => {
      res.send({
        success: true,
        record: record
      })
    })
    .catch(err => {
      res.status(422).send({success: false, message: err.message})
    })
}
