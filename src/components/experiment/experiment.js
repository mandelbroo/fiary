import React from 'react'

class Experiment extends React.Component {
  componentDidMount = () => this.props.getEntries()
  doStuff = (entries) => {
    const muze = window.muze()
    const schema = [
      {
        name: 'amount',
        type: 'measure',
        defAggFn: 'avg',
      },
      {
        name: 'income',
        type: 'dimension',
      },
    ]
    const day = entries.find((e) => e.day === '2018-08-23')
    if (day) {
      const data = day.records.map(({ amount, income }) => ({
        amount: Number.parseFloat(amount),
        income: income ? 'income' : 'expense',
      }))
      console.table(data)
      const DataModel = window.muze.DataModel
      const dm = new DataModel(data, schema)
      const canvas = muze.canvas()
      canvas
        .data(dm)
        .rows(['amount'])
        .columns(['income'])
        .mount('#chart')
    }
  }
  render() {
    const { entries } = this.props
    this.doStuff(entries)
    return <div id="chart" />
  }
}

export default Experiment
