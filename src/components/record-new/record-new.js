import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import Tagger from 'components/tagger/tagger'
import TagsFinder from 'services/tags-finder'
import styles from './styles'

const DEFAULT_STATE = {
  amount: '',
  income: false,
  tags: [],
}

export class RecordNew extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    record: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  state = DEFAULT_STATE

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.tags.length > 0) {
      this.props.onSubmit(this.state)
      this.clearState()
    }
  }

  clearState = () => {
    this.setState(DEFAULT_STATE)
    this.refs.tagger.clear()
  }

  tagsChange = (newState) => this.setState({ tags: newState })

  render() {
    const { classes } = this.props
    const symbolClass = this.state.income ? classes.plus : classes.minus
    return (
      <div className={classes.container}>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <div className={classes.left}>
            <label className={symbolClass}>
              <input
                type="checkbox"
                className={classes.check}
                checked={this.state.income}
                onChange={({ target }) =>
                  this.setState({ income: target.checked })
                }
              />
            </label>
            <input
              type="number"
              min="0"
              max="999999"
              step="0.01"
              required
              className={classes.amount}
              placeholder="amount"
              value={this.state.amount}
              onChange={({ target }) =>
                this.setState({ amount: Number.parseFloat(target.value) })
              }
            />
          </div>
          <Tagger
            className={classes.right}
            onChange={this.tagsChange}
            ref="tagger"
            service={TagsFinder}
          />
          <div className={classes.button}>
            <input type="submit" value="✓" />
          </div>
        </form>
      </div>
    )
  }
}

export default injectSheet(styles)(RecordNew)
