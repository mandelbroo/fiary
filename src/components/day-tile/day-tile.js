import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { DateTime } from 'luxon'

import styles from './styles'

export class DayTile extends React.Component {
  onClick = () => {
    const { click, entry } = this.props
    click(entry.day)
  }

  sum = (records, income = false) => {
    return records.reduce((acc, rec) => {
      if (rec.income === income) return acc + Number.parseFloat(rec.amount)
      return acc
    }, 0.0)
  }

  render() {
    const { classes, entry } = this.props
    const { day, records } = entry
    const date = DateTime.fromISO(day)
    const expenses = this.sum(records)
    const income = this.sum(records, true)
    return (
      <div className={classes.tile} onClick={this.onClick}>
        <div className={classes.date}>
          <h4>{`${date.toFormat('dd')}`}</h4>
          <span className={classes.weekday}>{date.weekdayLong}</span>
        </div>
        <div className={classes.numbers}>
          <span className={expenses > 0 ? classes.expense : classes.blank}>
            {expenses}
          </span>
          <span className={income > 0 ? classes.income : classes.blank}>
            {income}
          </span>
        </div>
      </div>
    )
  }
}

DayTile.propTypes = {
  click: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
}

export default injectSheet(styles)(DayTile)
