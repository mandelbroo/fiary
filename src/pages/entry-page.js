import React from 'react'
import RecordDay from '../components/record-day/record-day'

class EntryPage extends React.Component {
	render = () => {
		return <RecordDay id={ this.props.match.params.entryId } />
	}
}

export default EntryPage
