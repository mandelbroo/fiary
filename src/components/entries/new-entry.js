import React, {Component} from 'react'
import axios from 'axios'
import Entry from '../../models/entry'
import Tagger from '../tagger/tagger'
import TagsFinder from '../../services/tags-finder'

export class ViewRecord extends Component {
  render() {
    const data = this.props.data
    const operation = data.income ? '+' : '-'
    const list = data.tags.map((tag, index) =>
      <li key={index} className='tag'>{tag.name}</li>)
    return (
      <div className='record'>
        <span className='operation'>{operation}</span>
        <span className='amount'>{this.props.data.amount}</span>
        <ul>
          {list}
        </ul>
      </div>)
  }
}

export class ListRecords extends Component {
  listItem = (item, index) =>
    <li key={index}>
      <ViewRecord data={item}/>
      <a onClick={() => {this.props.onRemove(item)}}>×</a>
    </li>

  render = () => {
    const items = this.props.data ? [].concat(this.props.data) : []
    return (<ul>
        {items.map(this.listItem)}
      </ul>)
  }
}

export class NewRecord extends Component {
  get divider() {return ' '}
  state = this.props.data
    ? this.props.data
    : {
      amount: '',
      income: false
    }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
    this.clearState()
  }

  clearState = () => {
    this.setState({amount: '', income: false, tags: []})
    this.refs.tagger.clear()
  }

  tagsChange = (newState) => this.setState({tags: newState})

  render() {
    return (<form onSubmit={this.onSubmit}>
        <input type='checkbox' checked={this.state.income}
          onChange={({target}) => this.setState({income: target.checked})} />
        <input type='number' step='0.01' min='0.01' placeholder='amount' required
          value={this.state.amount}
          onChange={({target}) => this.setState({amount: target.value})} />
        <Tagger onChange={this.tagsChange} ref='tagger' service={TagsFinder}/>
        <input type='submit' value='done' />
      </form>)
  }
}

export default class DayRecords extends Component {
  state = this.props.data ? this.props.data : { id: -1, records: [] }
  recIndex = -1

  get records() {return this.state.records}

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
        <ListRecords data={this.state.records} onRemove={this.remove} />
        <NewRecord onSubmit={this.add} />
        <button className='saveButton' onClick={this.save}>Save</button>
      </div>
    )
  }
}
