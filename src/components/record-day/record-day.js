import React from 'react'
import PropTypes from 'prop-types'

import RecordList from 'components/record-list/record-list'
import RecordNew from 'components/record-new/record-new'
import DayHeader from 'components/day-header'

export class RecordDay extends React.Component {
  componentWillUnmount = () => this.props.clearSelectedRecord()

  onAddRecord = (record) => {
    const { entry, addRecord } = this.props
    const { id, day } = entry
    if (id) record.entryId = id
    if (!record.entryId) record.entry = { day }
    addRecord(record)
  }

  render() {
    const {
      entry,
      removeRecord,
      selectRecord,
      clearSelectedRecord,
    } = this.props
    return (
      <React.Fragment>
        <DayHeader entry={entry} />
        <RecordList
          records={entry.records || []}
          onRemoveClick={selectRecord}
          onRemoveCancel={clearSelectedRecord}
          onRemove={removeRecord}
        />
        <RecordNew onSubmit={this.onAddRecord} />
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
