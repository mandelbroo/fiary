import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

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

  render() {
    const { redirectPath } = this.state
    if (redirectPath) return redirect(redirectPath)
    const { classes, entries, redirect } = this.props
    return (
      <div className={classes.container}>
        {entries.map((entry, ix) => (
          <DayTile entry={entry} click={this.click} key={ix} />
        ))}
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
