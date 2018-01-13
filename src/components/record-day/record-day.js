import React from 'react'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import Entry from '../../models/entry'

export default class RecordDay extends React.Component {
  state = this.props.data
      ? this.props.data
      : { id: this.props.id || -1, records: [] }
  entry = this.props.entry || Entry
  recIndex = -1

  componentDidMount = async () => {
    if (this.state.id > 0) {
      const res = await this.entry.getById(this.state.id)
      this.setState({records: res.data[0].records})
    }
  }

  add = (record) => {
    this.setState({
      ...this.state,
      records: this.state.records.concat([{id: this.recIndex, ...record}])
    })
    this.recIndex--
  }

  remove = (item) => {
    const newRecords = this.state.records.filter(record => record.id !== item.id)
    this.setState({records: newRecords})
  }

  save = async () => {
    const entry = new this.entry(this.state)
    const res = await entry.save()
    if (res.success) {
      this.setState(res.entry)
    }
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
