import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

const style = {
  itemsWrapper: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
  },
  item: {
    fontSize: '20px',
    padding: '10px',
    '&:not(last-of-type)': {
      marginRight: '30px',
    },
  },
}

export const PATHS = [
  { name: 'Today', path: 'today' },
  { name: 'All', path: 'entries' },
  { name: 'Add', path: 'calendar' },
]

class TabBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.itemsWrapper}>
        {PATHS.map((item, index) => (
          <Link className={classes.item} key={index} to={`/${item.path}`}>
            {item.name}
          </Link>
        ))}
      </div>
    )
  }
}

TabBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(style)(TabBar)
