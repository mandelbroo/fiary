import { createStore, applyMiddleware } from 'redux';
import promisesMiddleware from './middlewares/promise';
import promise from 'redux-promise';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

const defaultState = {
  entries: [],
};

let createStoreWithMiddleware = applyMiddleware(promisesMiddleware,promise,logger)(createStore)

const store = createStoreWithMiddleware(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

