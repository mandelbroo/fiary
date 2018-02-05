const recordsAdd = require('../services/records-add')
const Record = require('../models/record')

exports.post = (req, res) => {
  recordsAdd.execute(req.body)
    .then(rec => res.send({ success: true, record: rec }) )
    .catch(err => res.status(422).send({ success: false, message: err.message }))
}
exports.destroy = async (req, res, next) => {
  if (!req.params.id)
    res.status(422).send({ success: false, message: 'id not provided'})
  try {
    const result = await Record
      .where('id', parseInt(req.params.id))
      .destroy({ require: true })
    res.send({ success: true, message: `record ${req.params.id} destroyed`})
  } catch(err) {
    if (err.message === 'No Rows Deleted')
      res.status(422)
        .send({ success: false, message: `record ${req.params.id} not found` })
    else next(err)
  }
}
