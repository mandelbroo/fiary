import React from 'react'
import RecordDay from '../components/record-day/record-day'
import Entry from '../models/entry'
import { DateTime } from 'luxon'

class TodayPage extends React.Component {
  entry = this.props.entry || Entry
  state = { entry: null }

  componentDidMount = async () => {
    const res = await this.entry.getTodayEntry()
    if (res.data) {
      this.setState({ entry: res.data })
    }
  }

  render = () => {
    const day = this.state.entry ? this.state.entry.day : DateTime.local().toISODate()
    const weekday = DateTime.fromISO(day).weekdayLong
    return (
      <div>
        <h1>{weekday}</h1>
        <RecordDay data={this.state.entry} day={day} />
      </div>
    )
  }
}

export default TodayPage
