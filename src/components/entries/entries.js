import React from 'react'
import {Entry} from '../../models'
import {ListRecords} from '../entries/new-entry'

export default class Entries extends React.Component {
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
          this.setState({entries: res.data})
        }
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  render() {
    let records = []

    for(let i = 0; i < this.state.entries.length; i++) {
      records.push(<ListRecords key={i} data={this.state.entries[i]} />)
    }
    return (
      <div>
        <h3>Entries</h3>
        {records}
      </div>
    )
  }
}
