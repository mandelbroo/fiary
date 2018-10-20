import React from 'react'
import { Link } from 'react-router-dom'
import { jss } from 'react-jss'

import logo from './logo.svg'

const STYLE = {
  logo: {
    animation: 'logo-spin infinite 5s linear',
    height: '88px',
  },
  '@keyframes logo-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
}

export default class Logo extends React.Component {
  style = jss.createStyleSheet(STYLE).attach().classes

  render = () => (
    <Link to="/">
      <img src={logo} className={this.style.logo} alt="fiary logo" />
    </Link>
  )
}
