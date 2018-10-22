import React from 'react'
import PropTypes from 'prop-types'

import RecordList from 'components/record-list/record-list'
import RecordNew from 'components/record-new/record-new'
import DayHeader from 'components/day-header'
import Dialog from 'components/dialog/dialog'

export class RecordDay extends React.Component {
  componentWillUnmount = () => this.props.clearSelectedRecord()

  onAddRecord = (record) => {
    const { entry, addRecord } = this.props
    addRecord(record, entry)
  }

  get dialogState() {
    const { selectedRecord, clearSelectedRecord, removeRecord } = this.props
    if (selectedRecord) {
      return {
        show: true,
        amount: selectedRecord.amount,
        tags: selectedRecord.tags.map((t) => t.name + ' '),
        action: () => {
          removeRecord(selectedRecord)
          clearSelectedRecord()
        },
        close: clearSelectedRecord,
      }
    }
    return {}
  }

  render() {
    const { entry, selectRecord } = this.props
    return (
      <React.Fragment>
        <DayHeader entry={entry} />
        <RecordList records={entry.records || []} onRemove={selectRecord} />
        <RecordNew onSubmit={this.onAddRecord} />
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
  selectedRecord: PropTypes.object,
  addRecord: PropTypes.func.isRequired,
  selectRecord: PropTypes.func.isRequired,
  removeRecord: PropTypes.func.isRequired,
  clearSelectedRecord: PropTypes.func.isRequired,
}

export default RecordDay
