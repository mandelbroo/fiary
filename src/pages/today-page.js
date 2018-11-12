import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import RecordDay from 'components/record-day'
import { editEntryClear, editEntry, getEntryByDate } from 'actions/entries'
import { DateTime } from 'luxon'

export class TodayPage extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props
    const today = DateTime.local().toISODate()
    dispatch(getEntryByDate(today))
    dispatch(editEntry(today))
  }

  componentWillUnmount = () => this.props.dispatch(editEntryClear())

  render = () => <RecordDay />
}

TodayPage.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(TodayPage)
