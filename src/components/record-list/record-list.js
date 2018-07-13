import React from 'react'
import RecordView from '../record-view/record-view'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import styles from './styles'

export class RecordList extends React.Component {
	classes = this.props.classes || {}

	NoRecords = (className) => (<span className={className}>no records yet</span>)

	CrossButton = (clickFunc) => {
		return (<button
			className={this.classes.removeButton}
			onClick={clickFunc}
			>❌</button>)
	}

	removeButton = (item) =>
		this.props.onRemove ? this.CrossButton(() => this.props.onRemove(item)) : ''

	render() {
		const items = this.props.data ? [].concat(this.props.data) : []
		const records = items.map((item, index) => (
			<li key={index} className={this.classes.listItem}>
				<RecordView data={item} />
				{ this.removeButton(item) }
			</li>)
		)
		const content = records.length > 0 ? records : this.NoRecords(this.classes.noRecords)
		return (<ul className={this.classes.list}>
				{ content }
			</ul>)
	}
}

RecordList.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.array,
	onRemove: PropTypes.func,
}

export default injectSheet(styles)(RecordList)
