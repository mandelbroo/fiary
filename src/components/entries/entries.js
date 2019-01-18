import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import cn from 'classnames'
import _ from 'lodash'

import DayTile from 'components/day-tile/day-tile'
import { getEntries } from 'actions/entries'
import styles from './styles'

export class Entries extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    entries: PropTypes.array,
    loading: PropTypes.bool,
    page: PropTypes.number,
    maxPage: PropTypes.number,
  }

  state = { redirectPath: '' }

  componentDidMount = () => this.props.dispatch(getEntries())

  onDayClick = (day) => {
    const path = `/entry/${day}`
    this.props.history.push(path)
    this.setState({ redirectPath: path })
  }

  onShowMore = () => this.props.dispatch(getEntries(this.props.page + 1))

  renderDayTilesList = (entries, classes) => {
    let toRender = <div>no entries</div>
    if (entries.length > 0) {
      let monthsDivider = []
      toRender = entries.map((entry, ix) => {
        let tile = (
          <DayTile
            entry={entry}
            onClick={this.onDayClick}
            key={ix}
            tabindex="1"
          />
        )
        const month = DateTime.fromISO(entry.day).monthLong
        if (!monthsDivider.includes(month)) {
          monthsDivider.push(month)
          tile = (
            <React.Fragment key={ix}>
              <span className={classes.month}>{month}</span>
              {tile}
            </React.Fragment>
          )
        }
        return tile
      })
    }
    return toRender
  }

  render() {
    const { redirectPath } = this.state
    if (redirectPath) return this.props.redirect(redirectPath)

    const { classes, entries, loading, maxPage, page } = this.props
    const canLoadMore = page < maxPage

    return (
      <div className={classes.container}>
        {this.renderDayTilesList(entries, classes)}
        <button
          className={cn(classes.button, canLoadMore ? '' : 'disabled')}
          onClick={canLoadMore ? this.onShowMore : () => {}}
        >
          {loading ? 'Loading...' : 'Show More'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { entries, page, totalPages, loading } = state
  return {
    entries: _.orderBy(entries, 'day', ['desc']),
    page: page,
    maxPage: totalPages,
    loading: loading,
  }
}

export default connect(mapStateToProps)(injectSheet(styles)(Entries))
