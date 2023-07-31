import { combineReducers } from 'redux';
import accountReducer from './accountReducers';
import resetPasswordReducer from './resetPasswordReducers';
import loginReducer from './loginReducers';
import registrationReducer from './registrationReducers';
import notificationReducer from './notificationReducers';

const rootReducer = combineReducers({
  account: accountReducer,
  resetPassword: resetPasswordReducer,
  login: loginReducer,
  registration: registrationReducer,
  notification: notificationReducer
});

export default rootReducer;
