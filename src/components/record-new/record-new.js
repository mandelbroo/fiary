import React from 'react'
import Tagger from '../tagger/tagger'
import TagsFinder from '../../services/tags-finder'
import injectSheet from 'react-jss'

export class RecordNew extends React.Component {
  state = this.props.data
    ? this.props.data
    : {
      amount: '',
      income: false,
      tags: []
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
    return (<form onSubmit={this.onSubmit} className={this.classes.form}>
        <div className={this.classes.left}>
          <label className={symbolClass}>
            <input type='checkbox'
              className={this.classes.check}
              checked={this.state.income}
              onChange={({target}) => this.setState({income: target.checked})} />
          </label>
          <input type='number' min='0' max='999999' step='0.01' required
            className={this.classes.amount + ' w3-input'}
            placeholder='amount'
            value={this.state.amount}
            onChange={({target}) => this.setState({amount: target.value})} />
        </div>
        <Tagger className={this.classes.right}
          onChange={this.tagsChange} ref='tagger' service={TagsFinder}/>
        <div className={this.classes.button}>
          <input type='submit' value='✓' />
        </div>
      </form>)
  }
}

const inputFontSize = 20
const style = {
  form: {
    padding: '5px',
    '& input': {
      'border-style': 'none'
    },
  },
  plus: {
    fontSize: inputFontSize,
    padding: '5px',
    '&::after': {
      color: 'green',
      content: '"+"'
    }
  },
  minus: {
    fontSize: inputFontSize,
    padding: '5px',
    '&::after': {
      content: '"−"'
    }
  },
  check: {
    height: '0px',
    width: '0px'
  },
  amount: {
    fontSize: inputFontSize,
    width: '80%',
    display: 'inline-block',
    padding: 0,
    marginLeft: '6px',
    '&:focus': {
      outline: 'none'
    }
  },
  left: {
    width: '40%',
    display: 'table-cell',
    '& div': {
      textAlign: 'center'
    }
  },
  right: {
    display: 'table-cell'
  },
  button: {
    display: 'table-cell',
    '& input': {
      display: 'block',
      width: '40px',
      backgroundColor: 'white',
      color: '#0093bc',
      fontSize: inputFontSize + 6,
      padding: 0,
      '&:focus': {
        outline: 'none'
      }
    },
  }
}
export default injectSheet(style)(RecordNew)
