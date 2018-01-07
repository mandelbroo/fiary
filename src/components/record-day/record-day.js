import React from 'react'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import Entry from '../../models/entry'

export default class RecordDay extends React.Component {
  state = this.props.data ? this.props.data : { id: this.props.id || -1, records: [] }
  recIndex = -1

  get records() {return this.state.records}

  componentDidMount = async () => {
    if (this.state.id > 0) {
      const res = await Entry.getPath(`/entry/${this.state.id}`)
      this.setState({records: res.data[0].records})
    }
  }

  add = (record) => {
    this.setState({
      ...this.state,
      records: this.records.concat([{id: this.recIndex, ...record}])
    })
    this.recIndex--
  }

  remove = (item) => {
    const newRecords = this.state.records.filter(record => record.id !== item.id)
    this.setState({records: newRecords})
  }

  save = () => {
    const client = this.props.apiClient
    const apiClient = client ?
      new client(this.state) : new Entry(this.state)
    apiClient.save().then(response => {
      if (response.success) {
        this.setState(response.entry)
      }
    })
  }

  render = () => {
    return (
      <div>
        <h1>Wednesday</h1>
        <h5>29.11.12017</h5>
        <RecordList data={this.state.records} onRemove={this.remove} />
        <RecordNew onSubmit={this.add} />
        <button className='saveButton' onClick={this.save}>Save</button>
      </div>
    )
  }
}
