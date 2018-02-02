const Entry = require('../models/entry')
const apiRes = require('./api-response')

module.exports = {
  getAll: async (req, res) => {
    const user = await req.currentUserPromise
    Entry
      .query(qb => {
        qb.where('entries.user_id', '=', user.id)
        qb.orderBy('entries.id', 'DESC')
      })
      .fetchPage({
        pageSize: 15,
        page: 1,
        withRelated: ['records', 'records.tags']
      })
      .then(entries => {
        res.send(apiRes(entries))
      })
  },
  getById: async (req, res) => {
    const user = await req.currentUserPromise
    const entry = await Entry
      .where({id: req.params.id, user_id: user.id})
      .fetch({withRelated: ['records','records.tags']})
    res.send(entry)
  },
  getIdByDate: async (req, res) => {
    const user = await req.currentUserPromise
    let entry = await Entry
      .where({day: req.params.isoDate, user_id: user.id})
      .fetch({withRelated: ['records','records.tags']})
    if (!entry)
      entry = await Entry.create({
        day: req.params.isoDate,
        userId: user.id
      })
    res.send(entry)
  }
}
