import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import styles from './styles'

class Hamburger extends React.Component {
  // classes = `w3-container w3-cell w3-bar-item w3-button ${this.props.classes}`

  render() {
    const { classes, onClick } = this.props
    return (
      <span onClick={onClick} className={classes.wrapper}>
        ☰
      </span>
    )
  }
}

Hamburger.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default injectSheet(styles)(Hamburger)
