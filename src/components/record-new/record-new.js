import React from 'react'
import Tagger from '../tagger/tagger'
import TagsFinder from '../../services/tags-finder'

export default class RecordNew extends React.Component {
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
