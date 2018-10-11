import React, { Component } from 'react'
import propTypes from 'prop-types'

import { jss } from 'react-jss'
import styles from './styles'

class Tagger extends Component {
  state = {
    tags: this.props.tags || [],
    currentValue: '',
    suggestions: [],
  }
  classes = jss.createStyleSheet(styles).attach().classes

  add = (event) => {
    const { currentValue: val, tags } = this.state
    const { onChange } = this.props
    if (event.key === 'Enter') {
      event.preventDefault()
      if (val && val.length > 0) {
        const newTag = {
          id: -(tags.length + 1),
          name: val,
        }
        const newTags = tags.concat([newTag])
        this.setState({
          tags: newTags,
          currentValue: '',
        })
        if (onChange) this.props.onChange(newTags)
      }
    }
  }

  change = ({ target }) => {
    const { service } = this.props
    this.setState({ currentValue: target.value })
    clearTimeout(this.timeout)
    if (service && target.value) {
      this.timeout = setTimeout(async () => {
        this.setState({ suggestPromise: service.find(target.value) })
        const response = await this.state.suggestPromise
        this.setState({ suggestions: response.data })
      }, 300)
    } else if (!target.value) {
      this.clear()
    }
  }

  remove = (id) => {
    const { onChange } = this.props
    const newTags = this.state.tags.filter((tag) => tag.id !== id)
    this.setState({ tags: newTags })
    if (onChange) onChange(newTags)
  }

  clear = () => this.setState({ tags: [], currentValue: '', suggestions: [] })

  pickSuggest = (tag) => {
    const { onChange } = this.props
    const newTags = this.state.tags.concat([tag])
    this.setState({
      tags: newTags,
      suggestions: [],
      currentValue: '',
    })
    if (onChange) onChange(newTags)
  }

  get tags() {
    return this.state.tags.map((tag, index) => (
      <span
        key={index}
        id={tag.id}
        className="tag"
        onClick={() => this.remove(tag.id)}
      >
        {tag.name}
      </span>
    ))
  }

  get suggestions() {
    return this.state.suggestions.map((tag, index) => (
      <span
        key={index}
        className="suggest tag"
        onClick={() => this.pickSuggest(tag)}
      >
        {tag.name}
      </span>
    ))
  }

  render() {
    return (
      <div className={`${this.props.className} ${this.classes.main}`}>
        {this.tags}
        <input
          type="text"
          placeholder="find a tag"
          value={this.state.currentValue}
          onChange={this.change}
          onKeyDown={this.add}
        />
        {this.suggestions}
      </div>
    )
  }
}

Tagger.propTypes = {
  className: propTypes.string,
  service: propTypes.object,
  tags: propTypes.array,
  onChange: propTypes.func,
}

export default Tagger
