import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Layout from './layouts'
import store from './config/store'
import './global.css'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route component={Layout} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
