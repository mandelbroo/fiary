import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import rootReducer from 'reducers'

const configStore = () => {
  if (process.env.NODE_ENV === 'production')
    return createStore(rootReducer, applyMiddleware(promise(), thunk))
  return createStore(rootReducer, applyMiddleware(promise(), thunk, logger))
}

export default configStore()
