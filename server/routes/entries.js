const Entry = require('../models/entry')
const apiRes = require('./api-response')

module.exports = {
  get: (req, res) => {
    req.currentUserPromise
      .then(user => {
        Entry
          .query(qb => {
            qb.groupBy('entries.id')
            qb.where('entries.user_id', '=', user.id)
          })
          .fetchPage({
            pageSize: 15,
            page: 1,
            withRelated: ['records', 'records.tags']
          })
          .then(entries => {
            res.send(apiRes(entries))
          })
      })
  },
  getOne: async (req, res) => {
    const entry = await Entry
      .where({id: req.params.id})
      .fetchAll({withRelated: ['records','records.tags']})
    res.send(entry)
  }
}
