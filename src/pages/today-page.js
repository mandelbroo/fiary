import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import RecordDay from 'components/record-day'
import { clearEdit, editEntry, getEntries } from 'actions'
import { DateTime } from 'luxon'

export class TodayPage extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props
    const today = DateTime.local().toISODate()
    dispatch(getEntries(today))
    dispatch(editEntry(today))
  }

  componentWillUnmount = () => this.props.dispatch(clearEdit())

  render = () => <RecordDay />
}

TodayPage.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(TodayPage)
