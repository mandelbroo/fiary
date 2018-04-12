import React from 'react'
import RecordDay from '../components/record-day/record-day'
import store from '../store'
import {
	clearEdit,
	editEntry,
} from '../actions'

class EntryPage extends React.Component {
	componentDidMount = () => {
		store.dispatch(editEntry(this.props.match.params.entryDay))
	}
	componentWillUnmount = () => store.dispatch(clearEdit())
	render = () => <RecordDay />
}

export default EntryPage
