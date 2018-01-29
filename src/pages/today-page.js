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
      this.setState({
        entry: {
          ...res.data,
          records: res.data.records || []
        },
      })
    }
  }

  render = () => {
    const day = this.state.entry ? this.state.entry.day : DateTime.local().toISODate()
    return <RecordDay data={this.state.entry} day={day} />
  }
}

export default TodayPage
