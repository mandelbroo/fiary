import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

import styles from './styles'

class Hamburger extends React.Component {
  state = { active: false }

  click = () => {
    this.props.onClick()
    this.setState({ active: !this.state.active })
  }

  render() {
    const { classes } = this.props
    const { active } = this.state
    return (
      <div onClick={this.click} className={classes.wrapper}>
        <div className={cn(classes.inner, active ? 'active' : '')} />
      </div>
    )
  }
}

Hamburger.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default injectSheet(styles)(Hamburger)
