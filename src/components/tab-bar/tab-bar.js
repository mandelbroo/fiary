import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import TodayIcon from '@material-ui/icons/Today'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ViewListIcon from '@material-ui/icons/ViewList'

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
  { name: <TodayIcon />, path: 'today' },
  { name: <ViewListIcon />, path: 'entries' },
  { name: <DateRangeIcon />, path: 'calendar' },
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
