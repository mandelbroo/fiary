import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import SendIcon from '@material-ui/icons/Send'
import cn from 'classnames'

import Tagger from 'components/tagger/tagger'
import TagsFinder from 'services/tags-finder'
import styles from './styles'

const DEFAULT_STATE = {
  amount: 0,
  income: false,
  tags: [],
  default: true,
}

export class RecordNew extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    record: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  state = DEFAULT_STATE

  static getDerivedStateFromProps(props, state) {
    const { record } = props
    if (record && state.default) return { ...record, default: false }
    return null
  }

  onAmountChange = ({ target: { value } }) => {
    const newVal =
      value && value.length > 1 && !value.includes('.') && value.startsWith('0')
        ? value.substr(1, value.length - 1)
        : value
    this.setState({ amount: newVal })
  }

  onAmountTap = () => {
    this.amountInput.focus()
    this.setState({ income: !this.state.income })
  }

  onSubmit = () => {
    const { amount } = this.state
    const resultAmount = Number.parseFloat(Number.parseFloat(amount).toFixed(2))
    if (resultAmount && this.state.tags.length > 0) {
      const { id, income, tags, entryId } = this.state
      this.props.onSubmit({
        id,
        amount: resultAmount,
        income,
        tags,
        entryId,
      })
      this.clearState()
    }
  }

  clearState = () => this.setState(DEFAULT_STATE)

  setAmountRef = (input) => {
    input && input.focus() && input.select()
    this.amountInput = input
  }

  tagsChange = (newState) => this.setState({ tags: newState })

  render() {
    const { classes } = this.props
    const { amount, income, tags } = this.state
    const disabled = tags.length === 0 || !amount
    return (
      <div className={classes.container}>
        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <span className={classes.amount} onClick={this.onAmountTap}>
            <span className={income ? classes.plus : classes.minus}>
              {amount}
            </span>
            <span className={classes.currency}>₴</span>
          </span>
          <input
            type="tel"
            min="0"
            max="999999"
            step="1"
            required
            className={classes.amountInput}
            value={amount}
            ref={this.setAmountRef}
            onChange={this.onAmountChange}
          />
          <Tagger
            onChange={this.tagsChange}
            ref="tagger"
            tags={tags}
            service={TagsFinder}
          />
          <button
            className={cn(classes.sendButton, disabled ? 'disabled' : '')}
            onClick={disabled ? () => {} : this.onSubmit}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    )
  }
}

export default injectSheet(styles)(RecordNew)
