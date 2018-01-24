import React from 'react'
import Tagger from '../tagger/tagger'
import TagsFinder from '../../services/tags-finder'
import injectSheet from 'react-jss'

export class RecordNew extends React.Component {
  get divider() {return ' '}
  state = this.props.data
    ? this.props.data
    : {
      amount: '',
      income: false
    }
  classes = this.props.classes || {}

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
    const symbolClass = this.state.income ? this.classes.plus : this.classes.minus
    return (<form onSubmit={this.onSubmit}>
        <label className={symbolClass}>
          <input type='checkbox' checked={this.state.income}
            className={this.classes.check}
            onChange={({target}) => this.setState({income: target.checked})} />
        </label>
        <input type='number' step='0.01' min='0.01' placeholder='amount' required
          value={this.state.amount}
          onChange={({target}) => this.setState({amount: target.value})} />
        <Tagger onChange={this.tagsChange} ref='tagger' service={TagsFinder}/>
        <input type='submit' value='done' />
      </form>)
  }
}

const style = {
  plus: {
    '&::after': {
      color: 'green',
      content: '"+ "'
    }
  },
  minus: {
    '&::after': {
      content: '"− "'
    }
  },
  check: {
    height: '0px',
    width: '0px'
  }
}
export default injectSheet(style)(RecordNew)
