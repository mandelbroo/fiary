const Entry = require('../models/entry')
const apiRes = require('./api-response')

const getAll = async (req, res) => {
  const user = await req.currentUserPromise
  Entry.query((q) => {
    q.where('entries.user_id', '=', user.id)
    q.orderBy('entries.day', 'DESC')
  })
    .fetchPage({
      pageSize: 15,
      page: 1,
      withRelated: ['records', 'records.tags'],
    })
    .then((entries) => {
      res.send(apiRes(entries))
    })
}

const getById = async (req, res) => {
  const user = await req.currentUserPromise
  const entry = await Entry.where({
    id: req.params.id,
    user_id: user.id,
  }).fetch({ withRelated: ['records', 'records.tags'] })
  res.send(entry)
}

const getIdByDate = async (req, res) => {
  const user = await req.currentUserPromise
  let entry = await Entry.where({
    day: req.params.isoDate,
    user_id: user.id,
  }).fetch({ withRelated: ['records', 'records.tags'] })
  if (!entry) return res.sendStatus(204)
  res.send(entry)
}

module.exports = {
  getAll,
  getById,
  getIdByDate,
}
