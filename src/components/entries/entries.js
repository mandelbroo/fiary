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

  click = (id) => {
    const path = `/entry/${id}`
    this.props.history.push(path)
    this.setState({ redirectPath: path })
  }

  render() {
    if (this.state.redirectPath) {
      return this.props.redirect(this.state.redirectPath)
    }
    return <div>{
      this.state.entries.map((entry, ix) =>
        <DayTile entry={entry} click={this.click} key={ix}/>)
    }</div>
  }
}
