import React from 'react'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import Entry from '../../models/entry'
import Record from '../../models/record'
import Dialog from '../dialog/dialog'
import { DateTime } from 'luxon'

export default class RecordDay extends React.Component {
	state = this.props.data
			? this.props.data
			: {
				id: this.props.id || -1,
				day: this.props.day,
				records: []
			}
	record = this.props.record || Record
	entry = this.props.entry || Entry
	recIndex = -1

	componentDidMount = async () => {
		if (this.state.id > 0) {
			const res = await this.entry.getById(this.state.id)
			this.setState({ ...res.data })
		}
	}

	add = async (record) => {
		const finalRecord = {...record, entryId: this.state.id, id: this.recIndex }
		this.setState({
			...this.state,
			records: this.state.records.concat([finalRecord])
		})
		this.recIndex--
		const res = await this.record.save(finalRecord)
		if (res.success) {
			this.replaceOldRecord(res.record, record)
		}
	}

	replaceOldRecord = (newRecord, oldRecord) => {
		let newState = {
			records: [
				...this.state.records.filter(r => r === oldRecord),
				newRecord
			]
		}
		if (this.state.id < 1) { newState.id = newRecord.entryId }
		this.setState(newState)
	}

	remove = () => {
		const item = this.state.pending
		const newRecords = this.state.records.filter(r => r.id !== item.id)
		if (item.id > 0)
			this.record.destroy(item.id)
		this.setState({ records: newRecords, pending: '' })
	}

	showDialog = (item) => this.setState({ pending: item })

	clearRemoving = () => this.setState({ pending: '' })

	componentWillReceiveProps = (newProps) => {
		if (newProps.data) {
			this.setState({
				id: newProps.data.id,
				day: newProps.data.day,
				records: newProps.data.records,
			})
		}
	}

	render = () => {
		let dialog = {}
		if (this.state.pending) {
			dialog = {
				show: true,
				amount: this.state.pending.amount,
				tags: this.state.pending.tags.map(t => t.name + ' ')
			}
		}
		const weekday = DateTime.fromISO(this.state.day).weekdayLong
		return (
			<div>
				<h1>{weekday}</h1>
				<h5>{this.state.day}</h5>
				<RecordList data={this.state.records} onRemove={this.showDialog} />
				<div className="w3-bottom">
					<RecordNew onSubmit={this.add} />
				</div>
				<Dialog show={ dialog.show }
					onAction={ this.remove }
					onActionText='Remove'
					onClose={ this.clearRemoving }
				>
					<b>{dialog.amount} {dialog.tags}</b>
					<br />
					<span>to be removed</span>
					<br />
					<span> Are you sure?</span>
				</Dialog>
			</div>
		)
	}
}
