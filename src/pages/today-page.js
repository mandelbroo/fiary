import React from 'react'
import RecordDay from '../components/record-day/record-day'
import Entry from '../models/entry'

class TodayPage extends React.Component {
  entry = this.props.entry || Entry
  state = {todayId: null}

  componentDidMount = async () => {
    const res = await this.entry.getTodayId()
    if (res && res.id)
      this.setState({todayId: res.id})
  }

  render = () => <RecordDay id={this.state.todayId} />
}

export default TodayPage
