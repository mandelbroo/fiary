import React from 'react'
import PropTypes from 'prop-types'
import injectStylesheet from 'react-jss'
import cn from 'classnames'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './styles'

export class Dialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onAction: PropTypes.func,
    onClose: PropTypes.func,
    onActionText: PropTypes.string,
    children: PropTypes.any,
  }

  state = { show: this.props.show }

  componentWillReceiveProps = ({ show }) => {
    if (this.state.show !== show) {
      this.setState({ show })
    }
  }

  action = () => {
    this.props.onAction()
    this.hide()
  }

  hide = () => {
    const { onClose } = this.props
    this.setState({ show: !this.state.show })
    if (onClose) onClose()
  }

  willHide = ({ target }) => {
    if (target.className.includes && target.className.includes('shadow')) {
      this.hide()
    }
  }

  render = () => {
    const { classes, onAction, onActionText, children } = this.props
    const { show } = this.state
    const showClass = classes[show ? 'show' : 'hide']
    const actionButton = onAction ? (
      <button onClick={this.action}>{onActionText}</button>
    ) : (
      ''
    )
    return (
      <div className={cn(classes.shadow, showClass)} onClick={this.willHide}>
        <dialog className={classes.modal}>
          <section className={classes.childWrapper}>{children}</section>
          <div>
            {actionButton}
            <button className={classes.closeButton} onClick={this.hide}>
              <ArrowBackIcon />
            </button>
          </div>
        </dialog>
      </div>
    )
  }
}

export default injectStylesheet(styles)(Dialog)
