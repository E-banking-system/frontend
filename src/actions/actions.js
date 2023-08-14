// actions.js
import axios from 'axios';
import config from '../config';
                    
const apiURI = config.apiURI;


// Action types
export const REGISTER_BANQUIER_SUCCESS = 'REGISTER_BANQUIER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

// Action creators
const registerBanquierSuccess = (data) => {
  return {
    type: REGISTER_BANQUIER_SUCCESS,
    payload: data,
  };
};

const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};



export const registerBanquier = (requestData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        apiURI + '/api/v1/auth/banquier/register',
        requestData
      );
      // Dispatch a success action with the response data
      dispatch(registerBanquierSuccess(response.data));
      console.info("successfull registration");
      
      // Return the response data after successful registration
      return response.data;
    } catch (error) {
      // Handle the error, if any
      console.warn('Error registering banquier:', error);
    }
  };
};

export const loginUser = (requestData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        apiURI + '/api/v1/auth/authenticate',
        requestData
      );
      // Dispatch a success action with the response data
      dispatch(loginUserSuccess(response.data));
      console.info("successfull login");
      
      // Return the response data after successful registration
      return response.data;
    } catch (error) {
      // Handle the error, if any
      console.warn('Error login client:', error);
    }
  };
};
