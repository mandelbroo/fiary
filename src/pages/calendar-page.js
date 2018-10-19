import React from 'react'
import { Redirect } from 'react-router-dom'
import Calendar from 'react-calendar'
const { DateTime } = require('luxon')

class CalendarDay extends React.Component {
  state = { path: false }

  redirectDay = (day) => {
    const path = `/entry/${DateTime.fromMillis(Date.parse(day)).toISODate()}`
    this.props.history.push(path)
    this.setState({ path })
  }
  render() {
    const { path } = this.state
    let comp = null
    if (path) comp = <Redirect to={path} />
    else comp = <Calendar onClickDay={this.redirectDay} />
    return comp
  }
}

export default CalendarDay
