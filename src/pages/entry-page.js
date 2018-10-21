import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { clearEdit, editEntry } from 'actions'
import RecordDay from 'components/record-day/record-day'

class EntryPage extends React.Component {
  componentDidMount = () => {
    const { match, dispatch } = this.props
    dispatch(editEntry(match.params.entryDay))
  }

  componentWillUnmount = () => this.props.dispatch(clearEdit())

  render = () => <RecordDay />
}

EntryPage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(EntryPage)
