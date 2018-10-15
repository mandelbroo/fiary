import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import RecordDay from '../components/record-day/record-day'
import { clearEdit, editEntry, getEntries, getTodayDate } from '../actions'
import { DateTime } from 'luxon'

import Experiment from 'components/experiment'

export class TodayPage extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props
    const today = DateTime.local().toISODate()
    // console.time('sup')
    dispatch(getTodayDate())
    dispatch(getEntries(today))
    dispatch(editEntry(today))
    // console.log('%c SUP DUDE', 'color: red; font-weight: bolder')
    // console.table([today, { a: 1 }])
    // console.timeEnd('sup')
  }

  componentWillUnmount = () => this.props.dispatch(clearEdit())

  render() {
    return (
      <React.Fragment>
        <RecordDay />
        <Experiment />
      </React.Fragment>
    )
  }
}

TodayPage.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(TodayPage)
