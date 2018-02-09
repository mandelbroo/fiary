import React from 'react'
import { jss } from 'react-jss'
import STYLE from './dialog.style.js'

export default class Dialog extends React.Component {
  state = { show: this.props.show }
  style = jss.createStyleSheet(STYLE).attach().classes

  action = () => {
    this.props.onAction()
    this.hide()
  }

  hide = () => {
    this.setState({ show: !this.state.show })
    if (this.props.onClose)
      this.props.onClose()
  }

  willHide = ({target}) => {
    if (target.className.includes('shadow')) {
      this.hide()
    }
  }

  componentWillReceiveProps = (newProps) => {
    if (this.state.show !== newProps.show) {
      this.setState({ show: newProps.show })
    }
  }

  render = () => {
    const showClass = this.style[this.state.show ? 'show' : 'hide']
    const actionButton = this.props.onAction
      ? <button onClick={ this.action }>{ this.props.onActionText }</button>
      : ''
    return (
      <div className={`${this.style.shadow} ${showClass}`} onClick={this.willHide}>
        <dialog className={this.style.modal}>
          <section>
            { this.props.children }
          </section>
          <div>
            { actionButton }
            <button onClick={ this.hide }>Close</button>
          </div>
        </dialog>
      </div>
    )
  }
}
