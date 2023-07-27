import { combineReducers } from 'redux';
import accountReducer from './accountReducers';

const rootReducer = combineReducers({
  account: accountReducer,
});

export default rootReducer;
