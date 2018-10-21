import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'

export default class RoutesRender extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    )
  }
}
