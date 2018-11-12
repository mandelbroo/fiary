import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editEntryClear, editEntry, getEntryByDate } from 'actions/entries'
import RecordDay from 'components/record-day'

class EntryPage extends React.Component {
  componentDidMount = () => {
    const { match, dispatch } = this.props
    const day = match.params.entryDay
    dispatch(getEntryByDate(day))
    dispatch(editEntry(day))
  }

  componentWillUnmount = () => this.props.dispatch(editEntryClear())

  render = () => <RecordDay />
}

EntryPage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(EntryPage)
