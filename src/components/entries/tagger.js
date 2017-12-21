import React, {Component} from 'react'

export default class Tagger extends Component {
  state = {
    tags: this.props.tags || [],
    currentValue: false
  }

  click = (event) => {
    event.preventDefault()
    this.setState({tags: this.state.tags.concat([this.state.currentValue])})
  }

  change = (event) => {
    this.setState({currentValue: event.target.value})
  }

  render() {
    const tags = this.state.tags.map((tag,i) => <div key={i}>{tag}</div>)
    return (
      <div>
        {tags}
        <input type='text' onChange={this.change}/>
        <button onClick={this.click}>Add</button>
      </div>
    )
  }
}
