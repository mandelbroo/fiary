const knex = require('../../db/connection')

exports.annual = async (req, res) => {
  const user = await req.currentUserPromise
  const expensesPromise = annualStats(user.id, false)
  const incomePromise = annualStats(user.id, true)
  Promise.all([expensesPromise, incomePromise]).then((arrays) => {
    const stats = [].concat(...arrays).reduce(uniteAmounts, [])
    res.send({ stats })
  })
}

exports.monthly = async (req, res) => {
  const user = await req.currentUserPromise
  const expensesPromise = monthlyStats(user.id, false)
  const incomePromise = monthlyStats(user.id, true)
  Promise.all([expensesPromise, incomePromise]).then((arrays) => {
    const stats = [].concat(...arrays).reduce(uniteAmounts, [])
    res.send({ stats })
  })
}

function uniteAmounts(acc, { year, month, income, expenses }) {
  let union = month
    ? acc.find((m) => m.month === month)
    : acc.find((y) => y.year === year)
  if (!union) {
    union = month ? { month, year } : { year }
    acc.push(union)
  }
  if (income) union.income = income
  if (expenses) union.expenses = expenses
  return acc
}

function annualStats(userId, isIncome) {
  const label = isIncome ? 'income' : 'expenses'
  return knex('entries')
    .select(
      knex.raw(`extract(year from day::date) as year, sum(amount) as ${label}`)
    )
    .join('records', 'entries.id', '=', 'records.entry_id')
    .whereRaw('entries.user_id = ? and records.income = ?', [userId, isIncome])
    .groupByRaw('extract(year from day::DATE)')
    .orderByRaw('year desc')
}

function monthlyStats(userId, isIncome) {
  const label = isIncome ? 'income' : 'expenses'
  return knex('entries')
    .join('records', 'entries.id', '=', 'records.entry_id')
    .select(
      knex.raw(
        `extract(year from day::date) as year, extract(month from day::date) as month, sum(amount) as ${label}`
      )
    )
    .whereRaw('entries.user_id = ? and records.income = ?', [userId, isIncome])
    .groupByRaw('extract(year from day::DATE), extract(month from day::DATE)')
    .orderByRaw('year desc, month desc')
}
