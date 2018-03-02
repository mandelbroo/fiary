import React from 'react'
import RecordDay from '../components/record-day/record-day'
import store from '../store'
import {
	clearEdit,
	editEntry,
	getEntries,
	getTodayDate,
} from '../actions'
import { DateTime } from 'luxon'

export default class TodayPage extends React.Component {
	componentDidMount = () => {
		const today = DateTime.local().toISODate()
		store.dispatch(getTodayDate())
		store.dispatch(getEntries(today))
		store.dispatch(editEntry(today))
	}
	componentWillUnmount = () => store.dispatch(clearEdit())
	render = () => <RecordDay />
}
