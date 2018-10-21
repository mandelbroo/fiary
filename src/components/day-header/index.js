import React from 'react'
import { DateTime } from 'luxon'
import injectSheet from 'react-jss'

import { dateFormat } from 'consts/formats'
import styles from './styles'

export class DayHeader extends React.Component {
  render() {
    const { classes, entry } = this.props
    const date = DateTime.fromISO(entry.day)
    return (
      <div className={classes.container}>
        <h3 className={classes.heading}>{date.weekdayLong}</h3>
        <h5>{date.toFormat(dateFormat)}</h5>
      </div>
    )
  }
}

export default injectSheet(styles)(DayHeader)
