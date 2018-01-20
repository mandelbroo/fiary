import React from 'react'
import Entry from '../../models/entry'
import DayTile from '../day-tile/day-tile'

export default class Entries extends React.Component {
  state = { entries: [] }
  entry = this.props.entry || Entry

  componentDidMount = async () => {
    const res = await this.entry.getAll()
    if (res.data)
      this.setState({entries: res.data.collection})
  }

  click = (id) => this.setState({ redirectId: id })

  render() {
    if (this.state.redirectId) {
      const path = `/entry/${this.state.redirectId}`
      this.props.history.push(path)
      return this.props.redirect(path)
    }
    return <div>{
      this.state.entries
        .map((entry, ix) => <DayTile entry={entry} click={this.click} key={ix}/>)
    }</div>
  }
}
