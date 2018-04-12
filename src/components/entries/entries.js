import React from 'react'
import { connect } from 'react-redux'
import DayTile from '../day-tile/day-tile'
import { getEntries } from '../../actions'

export class Entries extends React.Component {
	state = { redirectPath: '' }

	componentDidMount = () => {
		this.props.dispatch(getEntries())
	}

	click = (day) => {
		const path = `/entry/${day}`
		this.props.history.push(path)
		this.setState({ redirectPath: path })
	}

	render() {
		if (this.state.redirectPath) {
			return this.props.redirect(this.state.redirectPath)
		}
		return <div>{
			this.props.entries.map((entry, ix) =>
				<DayTile entry={entry} click={this.click} key={ix}/>)
		}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		entries: state.entries.list
	}
}
export default connect(mapStateToProps)(Entries)
