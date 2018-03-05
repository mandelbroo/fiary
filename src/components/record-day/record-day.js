import React from 'react'
import { connect } from 'react-redux'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import Dialog from '../dialog/dialog'
import { DateTime } from 'luxon'
import { addRecord } from '../../actions'

export class RecordDay extends React.Component {
	add = (record) => {
		this.props.dispatch(addRecord(record, this.props.entry))
	}
	//remove = (record) => this.props.dispatch(removeRecord(record))
	//removalDialog = (record) => this.props.dispatch(pendingRemoval(record))

	get dialogState () {
		const record = this.props.pendingRemovalRecord
		if (record) {
			return {
				show: true,
				amount: record.amount,
				tags: record.tags.map(t => t.name + ' '),
				action: () => this.remove(record),
				close: this.props.clearPendingRemoval
			}
		}
		return {}
	}

	get weekday () { return DateTime.fromISO(this.props.entry.day).weekdayLong }

	render = () => (
		<div>
			<h1>{ this.weekday }</h1>
			<h5>{ this.props.entry.day }</h5>
			<RecordList data={ this.props.entry.records }
				onRemove={ this.removalDialog } />
			<div className="w3-bottom">
				<RecordNew onSubmit={ this.add } />
			</div>
			<Dialog show={ this.dialogState.show }
				onAction={ this.dialogState.action }
				onActionText='Remove'
				onClose={ this.dialogState.close }
			>
				<b>{this.dialogState.amount} {this.dialogState.tags}</b>
				<br />
				<span>to be removed</span>
				<br />
				<span> Are you sure?</span>
			</Dialog>
		</div>
	)
}

export const mapStateToProps = (state) => {
	console.log(state)
	return {
		entry: state.entries.list.find(e => e.day === state.editingEntry) || {}
	}
}

export default connect(mapStateToProps)(RecordDay)
