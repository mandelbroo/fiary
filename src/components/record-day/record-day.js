import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import DayHeader from '../day-header'
import Dialog from '../dialog/dialog'

import {
  addRecord,
  removeRecord,
  selectRecord,
  clearSelectedRecord,
  getEntries,
} from '../../actions'
import Record from '../../models/record'

export class RecordDay extends React.Component {
  componentWillUnmount = () => this.clearSelectedRecord()
  componentWillMount = () => {
    const { entry } = this.props
    if (entry && !entry.id && getEntries) this.dispatch(getEntries(entry.day))
  }

  get entry() {
    return this.props.entry || {}
  }
  get dispatch() {
    return this.props.dispatch
  }

  add = (record) => this.dispatch(addRecord(record, this.entry))
  remove = (record) => this.dispatch(removeRecord(record))
  selectRecord = (record) => this.dispatch(selectRecord(record))
  clearSelectedRecord = () => this.dispatch(clearSelectedRecord())

  get dialogState() {
    const record = this.props.record
    if (record) {
      return {
        show: true,
        amount: record.amount,
        tags: record.tags.map((t) => t.name + ' '),
        action: () => {
          this.remove(record)
          this.clearSelectedRecord()
        },
        close: this.clearSelectedRecord,
      }
    }
    return {}
  }

  render() {
    return (
      <React.Fragment>
        <DayHeader entry={this.entry} />
        <RecordList data={this.entry.records} onRemove={this.selectRecord} />
        <RecordNew onSubmit={this.add} />
        <Dialog
          show={this.dialogState.show}
          onAction={this.dialogState.action}
          onActionText="Remove"
          onClose={this.dialogState.close}
        >
          <b>
            {this.dialogState.amount} {this.dialogState.tags}
          </b>
          <br />
          <span>to be removed</span>
          <br />
          <span> Are you sure?</span>
        </Dialog>
      </React.Fragment>
    )
  }
}

RecordDay.PropTypes = {
  entry: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  const { entries, selectedRecord, editingEntry } = state
  let res = {
    entry: {
      day: editingEntry,
      records: [],
    },
    record: selectedRecord,
  }
  if (entries.list.length > 0) {
    res.entry = entries.list.find((e) => e.day === editingEntry) || res.entry
  }
  return res
}

export default connect(mapStateToProps)(RecordDay)
