import React, {Component} from 'react'

export default class Tagger extends Component {
  state = {
    tags: this.props.tags || [],
    currentValue: '',
    suggestions: []
  }

  add = (event) => {
    event.preventDefault()
    const val = this.state.currentValue
    if (val && val.length > 0) {
      const newTag = {
        id: -Date.now(),
        name: val
      }
      const newTags = this.state.tags.concat([newTag])
      this.setState({
        tags: newTags,
        currentValue: ''
      })
      if (this.props.onChange)
        this.props.onChange(newTags)
    }
  }

  change = (event) => {
    this.setState({currentValue: event.target.value})
    clearTimeout(this.timeout)
    this.timeout = setTimeout(async () => {
      this.setState({suggestPromise: this.props.service.post(this.state.currentValue)})
      const suggestions = await this.state.suggestPromise
      this.setState({suggestions: suggestions})
    }, 300)
  }

  remove = (id) => {
    const newTags = this.state.tags.filter(tag => tag.id !== id)
    this.setState({tags: newTags})
    if (this.props.onChange)
      this.props.onChange(newTags)
  }

  clear = () => this.setState({tags: []})

  pickSuggest = (tag) => {
    this.setState({
      tags: this.state.tags.concat([tag]),
      suggestions: []
    })
  }

  render() {
    const tags = this.state.tags.map((tag, index) => (
      <li key={index} id={tag.id}>
        {tag.name}
        <a onClick={() => {this.remove(tag.id)}}>×</a>
        </li>
    ))
    const suggestions = this.state.suggestions.map((tag, index) => (
      <li key={index}>
        <span className='suggest' onClick={() => {this.pickSuggest(tag)}}>
          {tag.name}
        </span>
      </li>
    ))
    return (
      <div>
        <ul>
          {tags}
        </ul>
        <input type='text' onChange={this.change} value={this.state.currentValue}/>
        <button onClick={this.add}>Add</button>
        <ul>
          {suggestions}
        </ul>
      </div>
    )
  }
}
