import React from 'react'
import RecordDay from '../components/record-day/record-day'
// import store from '../config/store'
import { connect } from 'react-redux'
import { clearEdit, editEntry } from '../actions'

class EntryPage extends React.Component {
  componentDidMount = () => {
    const { match, dispatch } = this.props
    dispatch(editEntry(match.params.entryDay))
  }
  componentWillUnmount = () => this.props.dispatch(clearEdit())
  render = () => <RecordDay />
}

export default connect(EntryPage)
