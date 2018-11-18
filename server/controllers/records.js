const Records = require('../services/records')
const entryCreate = require('../services/entry-create')
const Record = require('../models/record')

function getId(req) {
  const id = req.params.id || req.body.id
  return id ? parseInt(id) : 0
}

exports.post = async (req, res) => {
  const user = await req.currentUserPromise
  let args = { ...req.body }
  if (!args.entryId && args.entry) {
    const entry = await entryCreate(args.entry, user)
    args = { ...args, entryId: entry.id }
  }
  Records.execute(args)
    .then((rec) => res.send({ success: true, record: rec }))
    .catch((err) =>
      res.status(422).send({ success: false, message: err.message })
    )
}
exports.destroy = async (req, res, next) => {
  try {
    await Record.where('id', getId(req)).destroy({ require: true })
    res.send({ success: true, message: `record ${req.params.id} destroyed` })
  } catch (err) {
    if (err.message === 'No Rows Deleted')
      res
        .status(422)
        .send({ success: false, message: `record ${req.params.id} not found` })
    else next(err)
  }
}

exports.update = async (req, res, next) => {
  const { amount, income, tags } = req.body
  try {
    const id = getId(req)
    const record = await Record.findOne({ id })

    let updProps = {}
    if (record.amount !== amount) updProps.amount = amount
    if (record.income !== income) updProps.income = income

    const shouldUpd = Object.keys(updProps).length > 0
    const updRecord = shouldUpd ? await Record.update(updProps, { id }) : record

    await Records.resolveTags(record, tags)
    const updTags = await updRecord.tags().fetch()

    return res.send({
      success: true,
      record: {
        id: updRecord.id,
        entryId: updRecord.entryId,
        income: updRecord.income,
        amount: updRecord.amount,
        tags: updTags.map((t) => ({ id: t.id, name: t.name })),
      },
    })
  } catch (err) {
    next(err)
  }
}
