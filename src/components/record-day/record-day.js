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

export class RecordDay extends React.Component {
  componentWillMount = () => {
    const { entry, dispatch } = this.props
    if (entry && !entry.id && dispatch) dispatch(getEntries(entry.day))
  }
  componentWillUnmount = () => this.clearSelectedRecord()

  add = (record) => this.props.dispatch(addRecord(record, this.props.entry))
  remove = (record) => this.props.dispatch(removeRecord(record))
  selectRecord = (record) => this.props.dispatch(selectRecord(record))
  clearSelectedRecord = () => this.props.dispatch(clearSelectedRecord())

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
    const { entry } = this.props
    return (
      <React.Fragment>
        <DayHeader entry={entry} />
        <RecordList
          records={entry.records || []}
          onRemove={this.selectRecord}
        />
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

RecordDay.propTypes = {
  entry: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
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
