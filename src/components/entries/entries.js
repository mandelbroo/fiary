import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import DayTile from 'components/day-tile/day-tile'
import { getEntries } from 'actions'
import styles from './styles'

export class Entries extends React.Component {
  state = { redirectPath: '' }

  componentDidMount = () => this.props.dispatch(getEntries())

  click = (day) => {
    const path = `/entry/${day}`
    this.props.history.push(path)
    this.setState({ redirectPath: path })
  }

  renderDayTilesList = (entries) => {
    if (entries.length > 0) {
      let monthsDivider = []
      return entries.map((entry, ix) => {
        const tile = <DayTile entry={entry} click={this.click} key={ix} />
        const month = DateTime.fromISO(entry.day).monthLong
        if (!monthsDivider.includes(month)) {
          monthsDivider.push(month)
          return (
            <React.Fragment>
              {`--${month}`}
              {tile}
            </React.Fragment>
          )
        }
        return tile
      })
    } else return <div>no entries</div>
  }

  render() {
    const { classes, entries, redirect } = this.props
    const { redirectPath } = this.state
    if (redirectPath) return redirect(redirectPath)

    return (
      <div className={classes.container}>
        {this.renderDayTilesList(entries)}
      </div>
    )
  }
}

Entries.propTypes = {
  classes: PropTypes.object.isRequired,
  redirect: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  entries: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries.list,
  }
}

export default injectSheet(styles)(connect(mapStateToProps)(Entries))
