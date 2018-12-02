const knex = require('../../db/connection')

exports.monthly = async (req, res) => {
  const user = await req.currentUserPromise
  const stats = await knex('entries')
    .join('records', 'entries.id', '=', 'records.entry_id')
    .select(
      knex.raw(
        'extract(year from day::date) as year, extract(month from day::date) as month, sum(amount)'
      )
    )
    .where('entries.user_id', user.id)
    .groupByRaw('extract(year from day::DATE), extract(month from day::DATE)')
    .orderByRaw('year desc, month desc')
  res.send({ stats })
}
