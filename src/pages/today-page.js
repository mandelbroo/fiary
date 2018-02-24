import React from 'react'
import RecordDay from '../components/record-day/record-day'
import Entry from '../models/entry'
import Session from '../services/session'
import { DateTime } from 'luxon'

class TodayPage extends React.Component {
	entry = this.props.entry || Entry
	state = { entry: null }

	componentDidMount = () => {
		const user = Session.getUser()
		this.entry.getTodayEntry(user)
			.then(entry => {
				this.setState({ entry: { ...entry, records: entry.records || [] } })
			})
	}

	render = () => {
		const day = this.state.entry ? this.state.entry.day : DateTime.local().toISODate()
		return <RecordDay data={this.state.entry} day={day} />
	}
}

export default TodayPage
