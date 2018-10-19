import React from 'react'
import RecordDay from '../components/record-day/record-day'
import store from '../store'
import { clearEdit, editEntry } from '../actions'

class EntryPage extends React.Component {
  componentDidMount = () => {
    const { match } = this.props
    store.dispatch(editEntry(match.params.entryDay))
  }
  componentWillUnmount = () => store.dispatch(clearEdit())
  render = () => <RecordDay />
}

export default EntryPage
