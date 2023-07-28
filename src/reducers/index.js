import { combineReducers } from 'redux';
import accountReducer from './accountReducers';
import resetPasswordReducer from './resetPasswordReducers';
import loginReducer from './loginReducers';

const rootReducer = combineReducers({
  account: accountReducer,
  resetPassword: resetPasswordReducer,
  login: loginReducer,
});

export default rootReducer;
