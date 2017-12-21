import React, {Component} from 'react'

export default class Tagger extends Component {
  state = {
    tags: this.props.tags || [],
    currentValue: false
  }

  add = (event) => {
    event.preventDefault()
    const newTag = {
      id: -Date.now(),
      name: this.state.currentValue
    }
    this.setState({tags: this.state.tags.concat([newTag])})
  }

  change = (event) => {
    this.setState({currentValue: event.target.value})
  }

  remove = (id) => {
    const newTags = this.state.tags.filter(tag => tag.id !== id)
    this.setState({tags: newTags})
  }

  render() {
    const tags = this.state.tags.map((tag, index) => {
      return (<li key={index} id={tag.id}>
        {tag.name}
        <a onClick={() => {this.remove(tag.id)}}>×</a>
        </li>)
    })
    return (
      <div>
        <ul>
          {tags}
        </ul>
        <input type='text' onChange={this.change}/>
        <button onClick={this.add}>Add</button>
      </div>
    )
  }
}
