import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  wrapper: {
    borderRadius: '50%',
    border: '1px solid transparent',
    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    cursor: 'pointer',
    width: 42,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: 20,
    outline: 'none',
    '&:active': {
      boxShadow: 'none',
      border: '1px solid #ccc',
    },
    '&:focus': {
      border: '1px solid #ccc',
    },
  },
  icon: {
    fontSize: 32,
  },
}

class AddButton extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  }
  render() {
    const { classes, onClick, className } = this.props
    return (
      <button className={cn(classes.wrapper, className)} onClick={onClick}>
        <AddIcon className={classes.icon} />
      </button>
    )
  }
}

export default injectSheet(styles)(AddButton)
