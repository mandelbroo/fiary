import React from 'react'
import { jss } from 'react-jss'

const STYLE = {
  modal: {
    width: '90%',
    height: '25%',
    marginTop: '50%',
    zIndex: 11,
    border: 'none',
    display: 'block',
    borderRadius: '3px',
    '& section': {
      top: '15%',
      display: 'block',
      width: '100%',
      position: 'relative',
    },
    '& div': {
      top: '30%',
      position: 'relative',
      '& button': {
        display: 'table-cell'
      }
    }
  },
  shadow: {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
}

export default class Dialog extends React.Component {
  state = { show: this.props.show }
  style = jss.createStyleSheet(STYLE).attach().classes

  hide = () => {
    this.setState({ show: !this.state.show })
    if (this.props.onClose)
      this.props.onClose()
  }

  willHide = ({target}) => { if (target.className.includes('shadow')) this.hide() }

  componentWillReceiveProps = (newProps) => {
    if (this.state.show !== newProps.show) {
      this.setState({ show: newProps.show })
    }
  }

  render = () => {
    const showClass = this.style[this.state.show ? 'show' : 'hide']
    return (
      <div className={`${this.style.shadow} ${showClass}`} onClick={this.willHide}>
        <dialog className={this.style.modal}>
          <section>
            { this.props.children }
          </section>
          <div>
            { this.props.onAction
              ? <button onClick={ this.props.onAction }>{ this.props.onActionText }</button>
              : '' }
            <button className='close' onClick={ this.hide }>Close</button>
          </div>
        </dialog>
      </div>
    )
  }
}
