import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RecordDayComponent from './record-day'
import {
  addRecord,
  removeRecord,
  selectRecord,
  clearSelectedRecord,
  getEntries,
} from 'actions'

class RecordDayContainer extends React.PureComponent {
  render() {
    return <RecordDayComponent {...this.props} />
  }
}

RecordDayContainer.propTypes = {
  addRecord: PropTypes.func.isRequired,
  removeRecord: PropTypes.func.isRequired,
  selectRecord: PropTypes.func.isRequired,
  clearSelectedRecord: PropTypes.func.isRequired,
  getEntries: PropTypes.func.isRequired,
}

export const mapStateToProps = (state) => {
  const { entries, selectedRecord, editingEntry } = state
  let res = {
    entry: {
      day: editingEntry,
      records: [],
    },
    selectedRecord,
  }
  if (entries.list.length > 0) {
    res.entry = entries.list.find((e) => e.day === editingEntry) || res.entry
  }
  return res
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addRecord: (...args) => dispatch(addRecord(...args)),
  getEntries: (...args) => dispatch(getEntries(...args)),
  removeRecord: (...args) => dispatch(removeRecord(...args)),
  selectRecord: (...args) => dispatch(selectRecord(...args)),
  clearSelectedRecord: (...args) => dispatch(clearSelectedRecord(...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordDayContainer)
