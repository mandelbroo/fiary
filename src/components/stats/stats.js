import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import cn from 'classnames'
import injectSheet from 'react-jss'
import Chartist from 'chartist'

import Stats from 'models/stats'
import styles from './styles'

class StatsComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    annual: null,
    monthly: null,
    currentYear: new Date().getFullYear(),
  }

  async componentDidMount() {
    Stats.annual().then(({ data }) => this.setState({ annual: data.stats }))
    Stats.monthly().then(({ data }) => this.setState({ monthly: data.stats }))
  }

  mapYear = (stats) => {
    const { year, income, expenses } = stats
    return (
      <div key={year}>
        <h3>{year}</h3>
        <span>{income}</span>
        <span>{expenses}</span>
      </div>
    )
  }

  mapMonth = (stats) => {
    const { year, month, income, expenses } = stats
    const { classes } = this.props
    const monthLong = DateTime.local(year, month, 1).monthLong
    return (
      <div
        key={`${year}${month}`}
        classes={cn(classes.monthWrapper, monthLong.toLowerCase())}
      >
        <h3>{monthLong}</h3>
        <span>{income}</span>
        <span>{expenses}</span>
      </div>
    )
  }

  renderAnnual(rawData) {
    if (rawData) {
      const preData = {
        income: Number.parseInt(rawData.income),
        expenses: Number.parseInt(rawData.expenses),
      }
      const total = preData.income + preData.expenses
      const percentage = {
        income: Number.parseInt(preData.income / (total / 100)),
        expenses: Number.parseInt(preData.expenses / (total / 100)),
      }
      const data = {
        labels: [`income ${preData.income}`, `expenses ${preData.expenses}`],
        series: [{ value: percentage.income }, { value: percentage.expenses }],
      }
      const options = {
        donut: true,
        donutWidth: 40,
        // donutSolid: true,
        startAngle: 270,
        total: 200,
        showLabel: true,
        // stretch: true,
      }
      new Chartist.Pie('#annual', data, options)
    }
  }

  renderMonths(rawData) {
    const options = {
      // stackBars: true,
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70,
      },
    }
    const labels = rawData.map(
      (i) => DateTime.local(i.year, i.month, 1).monthLong
    )
    const series = [
      rawData.map((i) => Number.parseInt(i.income || 0)),
      rawData.map((i) => Number.parseInt(i.expenses || 0)),
    ]
    const data = {
      labels,
      series,
    }
    new Chartist.Bar('#months', data, options)
  }

  render() {
    const { classes } = this.props
    const { annual, monthly, currentYear } = this.state
    if (annual) this.renderAnnual(annual.find((i) => i.year === currentYear))
    if (monthly) {
      this.renderMonths(monthly.filter((i) => i.year === currentYear))
    }
    return (
      <div className={classes.wrapper}>
        <div
          id="annual"
          style={{
            width: '100%',
            height: '300px',
          }}
        />
        <div
          id="months"
          style={{
            width: '100%',
            height: '600px',
            position: 'relative',
            top: '-100px',
          }}
        />
      </div>
    )
  }
}

export default injectSheet(styles)(StatsComponent)
