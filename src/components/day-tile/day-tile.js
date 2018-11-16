import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { DateTime } from 'luxon'

import styles from './styles'

export class DayTile extends React.Component {
  onClick = () => {
    const { onClick, entry } = this.props
    onClick(entry.day)
  }

  sum = (records, income = false) => {
    return records.reduce((acc, rec) => {
      if (rec.income === income)
        return Number.parseFloat(
          (acc + Number.parseFloat(rec.amount)).toFixed(2)
        )
      return acc
    }, 0)
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
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
}

export default injectSheet(styles)(DayTile)
