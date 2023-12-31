import { combineReducers } from 'redux';
import accountReducer from './accountReducers';
import resetPasswordReducer from './resetPasswordReducers';
import loginReducer from './loginReducers';
import registrationReducer from './registrationReducers';
import notificationReducer from './notificationReducers';
import virementReducer from './virementReducers';
import beneficiaireReducer from './beneficierReducers';
import clientsReducer from './clientsReducers';
import profileReducer from './profileReducers';
import otpReducer from './otpReducers';

const rootReducer = combineReducers({
  account: accountReducer,
  resetPassword: resetPasswordReducer,
  login: loginReducer,
  registration: registrationReducer,
  notification: notificationReducer,
  virement: virementReducer,
  beneficiaires: beneficiaireReducer,
  clients: clientsReducer,
  profile: profileReducer, 
  otp: otpReducer,
});

export default rootReducer;
