import React from 'react'
import Entry from '../../models/entry'
import RecordList from '../record-list/record-list'
import injectSheet from 'react-jss'
import styles from './styles'
import { Redirect } from "react-router-dom"

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: []
    }
  }

  componentDidMount() {
    Entry.getAll({where: {}}, 15)
      .then(res => {
        if (res.data) {
          this.setState({entries: res.data.collection})
        }
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  click = (id) => this.setState({ redirectId: id })

  render() {
    if (this.state.redirectId) {
      const path = `/entry/${this.state.redirectId}`
      return <Redirect to={path} />
    }
    let records = []
    let index = 0
    for(let entry of this.state.entries) {
      records.push(
        <div key={index} className={this.props.classes.tile}
          onClick={() => {this.click(entry.id)}}>
          {entry.id}
          <br />
          {entry.createdAt}
          <RecordList data={entry.records} />
        </div>)
      index++
    }
    return (
      <div>
        <h3>Entries</h3>
        {records}
      </div>)
  }
}

export default injectSheet(styles)(Entries)
