import React from 'react'
import { connect } from 'react-redux'
import DayTile from '../day-tile/day-tile'
import { getEntries } from '../../actions'

import injectSheet from 'react-jss'
import styles from './styles.js'

export class Entries extends React.Component {
	state = { redirectPath: '' }
	classes = this.props.classes || {}

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
		return <div className={ this.classes.container }>{
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

export default injectSheet(styles)(connect(mapStateToProps)(Entries))
