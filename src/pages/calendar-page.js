import React from 'react'
import { Redirect } from 'react-router-dom'
import Calendar from 'react-calendar'
import { DateTime } from 'luxon'
import injectSheet from 'react-jss'

import styles from './styles'

class CalendarDay extends React.Component {
  state = { path: false }

  redirectDay = (day) => {
    const { history } = this.props
    const path = `/entry/${DateTime.fromMillis(Date.parse(day)).toISODate()}`
    history.push(path)
    this.setState({ path })
  }

  render() {
    const { path } = this.state
    const { classes } = this.props
    let comp = null
    if (path) comp = <Redirect to={path} />
    else
      comp = (
        <Calendar
          className={classes.calendarWrapper}
          onClickDay={this.redirectDay}
        />
      )
    return comp
  }
}

export default injectSheet(styles)(CalendarDay)
