import React, {Component} from 'react'
import {jss} from 'react-jss'

export default class Tagger extends Component {
  state = {
    tags: this.props.tags || [],
    currentValue: '',
    suggestions: []
  }
  classes = jss.createStyleSheet(style).attach().classes

  add = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const val = this.state.currentValue
      if (val && val.length > 0) {
        const newTag = {
          id: - (this.state.tags.length + 1),
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
  }

  change = ({target}) => {
    this.setState({currentValue: target.value})
    clearTimeout(this.timeout)
    if (this.props.service && target.value) {
      this.timeout = setTimeout(async () => {
        this.setState({suggestPromise: this.props.service.find(target.value)})
        const response = await this.state.suggestPromise
        this.setState({suggestions: response.data})
      }, 300)
    }
  }

  remove = (id) => {
    const newTags = this.state.tags.filter(tag => tag.id !== id)
    this.setState({tags: newTags})
    if (this.props.onChange)
      this.props.onChange(newTags)
  }

  clear = () => this.setState({tags: [], currentValue: '', suggestions: []})

  pickSuggest = (tag) => {
    const newTags = this.state.tags.concat([tag])
    this.setState({
      tags: newTags,
      suggestions: [],
      currentValue: ''
    })
    if (this.props.onChange)
      this.props.onChange(newTags)
  }

  render() {
    const tags = this.state.tags.map((tag, index) => (
      <span key={index} id={tag.id} onClick={() => {this.remove(tag.id)}}>
        {tag.name}
      </span>
    ))
    const suggestions = this.state.suggestions.map((tag, index) => (
      <span key={index} className='suggest' onClick={() => {this.pickSuggest(tag)}}>
        {tag.name}
      </span>
    ))
    return (
      <div className={`${this.props.className} ${this.classes.main}`}>
        {suggestions}
        <input type='text'
          placeholder='add new tag'
          value={this.state.currentValue}
          onChange={this.change}
          onKeyDown={this.add} />
        {tags}
      </div>
    )
  }
}

const style = {
  main: {
    '& input': {
      fontSize: 20,
      width: '90%',
      borderStyle: 'none',
      '&:focus': {
        outline: 'none'
      }
    }
  }
}
