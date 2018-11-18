import React, { Component } from 'react'
import propTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

import styles from './styles'

const DEFAULT_STATE = {
  tags: [],
  currentValue: '',
  suggestions: [],
}

class Tagger extends Component {
  static propTypes = {
    className: propTypes.string,
    classes: propTypes.object.isRequired,
    service: propTypes.object,
    tags: propTypes.array,
    onChange: propTypes.func,
  }

  state = DEFAULT_STATE

  componentWillReceiveProps({ tags }) {
    if (tags) this.setState({ tags: tags })
  }

  add = (e) => {
    const { currentValue: val, tags } = this.state
    const { onChange } = this.props
    if (e.key === 'Enter') {
      e.preventDefault()
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
      } else this.setState({ suggestions: [] })
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
      this.setState({ suggestions: [] })
    }
  }

  remove = (id) => {
    const { onChange } = this.props
    const newTags = this.state.tags.filter((tag) => tag.id !== id)
    this.setState({ tags: newTags })
    if (onChange) onChange(newTags)
  }

  clear = () => this.setState(DEFAULT_STATE)

  pickSuggest = (tag) => {
    const { onChange } = this.props
    const newTags = this.state.tags.concat([tag])
    this.setState({ suggestions: [], currentValue: '' })
    this.refs.input.focus()
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
    const { className, classes } = this.props
    return (
      <div className={cn(classes.main, className)}>
        <div>
          {this.tags}
          <input
            type="text"
            placeholder="find a tag"
            value={this.state.currentValue}
            onChange={this.change}
            onKeyDown={this.add}
            ref="input"
          />
        </div>
        <div>{this.suggestions}</div>
      </div>
    )
  }
}

export default injectSheet(styles)(Tagger)
