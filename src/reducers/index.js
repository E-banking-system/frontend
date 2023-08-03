import { combineReducers } from 'redux';
import accountReducer from './accountReducers';
import resetPasswordReducer from './resetPasswordReducers';
import loginReducer from './loginReducers';
import registrationReducer from './registrationReducers';
import notificationReducer from './notificationReducers';
import virementReducer from './virementReducers';

const rootReducer = combineReducers({
  account: accountReducer,
  resetPassword: resetPasswordReducer,
  login: loginReducer,
  registration: registrationReducer,
  notification: notificationReducer,
  virement: virementReducer,
});

export default rootReducer;
