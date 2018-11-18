import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import RecordList from 'components/record-list/record-list'
import RecordNew from 'components/record-new/record-new'
import DayHeader from 'components/day-header'
import Dialog from 'components/dialog/dialog'
import AddButton from 'components/AddButton'

export class RecordDay extends React.Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    selectedRecord: PropTypes.object,
    addRecord: PropTypes.func.isRequired,
    updateRecord: PropTypes.func.isRequired,
    selectRecord: PropTypes.func.isRequired,
    removeRecord: PropTypes.func.isRequired,
    clearSelectedRecord: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    showCreateRecord: false,
  }

  componentWillUnmount = () => this.props.clearSelectedRecord()

  onSubmitRecord = (rec) => {
    const { entry, addRecord, updateRecord } = this.props
    const { day } = entry
    const record = { ...rec }
    if (record.id) {
      updateRecord(record)
    } else {
      if (entry.id) record.entryId = entry.id
      if (!record.entryId) record.entry = { day }
      addRecord(record)
    }
    this.toggleCreateRecord()
  }

  toggleCreateRecord = (record) => {
    const { showCreateRecord } = this.state
    const newState = { showCreateRecord: !showCreateRecord }
    this.setState(newState, () => this.props.selectRecord(record))
  }

  render() {
    const {
      entry,
      removeRecord,
      selectRecord,
      clearSelectedRecord,
      selectedRecord,
      classes,
    } = this.props
    const { showCreateRecord } = this.state
    return (
      <React.Fragment>
        <DayHeader entry={entry} />
        <RecordList
          records={entry.records || []}
          onRemoveClick={selectRecord}
          onRemoveCancel={clearSelectedRecord}
          onRemove={removeRecord}
          onRecordClick={(record) => this.toggleCreateRecord(record)}
        />
        <AddButton
          className={classes.addButton}
          onClick={() => this.toggleCreateRecord()}
        />
        <Dialog show={showCreateRecord} onClose={this.toggleCreateRecord}>
          {showCreateRecord && (
            <RecordNew onSubmit={this.onSubmitRecord} record={selectedRecord} />
          )}
        </Dialog>
      </React.Fragment>
    )
  }
}

const styles = {
  addButton: {
    marginBottom: 50,
  },
}

export default injectSheet(styles)(RecordDay)
