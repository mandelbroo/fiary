const recordsAdd = require('../services/records-add')
const entryCreate = require('../services/entry-create')
const Record = require('../models/record')

exports.post = async (req, res) => {
  const user = await req.currentUserPromise
  let args = req.body
  if (!args.entryId && args.entry) {
    const entry = await entryCreate(args.entry, user)
    args = { ...args, entryId: entry.id }
  }
  recordsAdd
    .execute(args)
    .then((rec) => res.send({ success: true, record: rec }))
    .catch((err) =>
      res.status(422).send({ success: false, message: err.message })
    )
}
exports.destroy = async (req, res, next) => {
  try {
    await Record.where('id', parseInt(req.params.id)).destroy({ require: true })
    res.send({ success: true, message: `record ${req.params.id} destroyed` })
  } catch (err) {
    if (err.message === 'No Rows Deleted')
      res
        .status(422)
        .send({ success: false, message: `record ${req.params.id} not found` })
    else next(err)
  }
}
