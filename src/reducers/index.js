import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';

const rootReducer = combineReducers({entries, routing: routerReducer });

export default rootReducer;
