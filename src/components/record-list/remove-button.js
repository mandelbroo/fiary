import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './styles'

class RemoveButton extends React.PureComponent {
  state = { clicked: false }

  render() {
    const { classes, onCancel, onClick, onApprove, record } = this.props
    const { clicked } = this.state
    if (clicked) {
      return (
        <div className={classes.removeWrapper}>
          <button
            className={classes.removeApprove}
            onClick={() => {
              this.setState({ clicked: false })
              onApprove(record)
            }}
          >
            Remove
          </button>
          <button
            className={classes.removeCancel}
            onClick={() => {
              this.setState({ clicked: false })
              onCancel()
            }}
          >
            No
          </button>
        </div>
      )
    }
    return (
      <div className={classes.removeWrapper}>
        <button
          className={classes.removeButton}
          onClick={() => {
            this.setState({ clicked: true })
            onClick(record)
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    )
  }
}

RemoveButton.propTypes = {
  classes: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default injectSheet(styles)(RemoveButton)
