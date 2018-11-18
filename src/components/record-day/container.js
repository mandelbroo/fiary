import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RecordDayComponent from './record-day'
import { getEntries } from 'actions/entries'
import {
  addRecord,
  updateRecord,
  removeRecord,
  selectRecord,
  clearSelectedRecord,
} from 'actions/records'

class RecordDayContainer extends React.PureComponent {
  static propTypes = {
    addRecord: PropTypes.func.isRequired,
    removeRecord: PropTypes.func.isRequired,
    selectRecord: PropTypes.func.isRequired,
    clearSelectedRecord: PropTypes.func.isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  render() {
    return <RecordDayComponent {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { entries, selectedRecord, selectedEntry } = state
  let res = {
    entry: {
      day: selectedEntry,
      records: [],
    },
    selectedRecord,
  }
  if (entries.length > 0) {
    res.entry = entries.find((e) => e.day === selectedEntry) || res.entry
  }
  return res
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addRecord: (...args) => dispatch(addRecord(...args)),
  updateRecord: (...args) => dispatch(updateRecord(...args)),
  getEntries: (...args) => dispatch(getEntries(...args)),
  removeRecord: (...args) => dispatch(removeRecord(...args)),
  selectRecord: (...args) => dispatch(selectRecord(...args)),
  clearSelectedRecord: (...args) => dispatch(clearSelectedRecord(...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordDayContainer)
