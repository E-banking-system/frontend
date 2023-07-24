// actions.js
import axios from 'axios';

// Action types
export const REGISTER_BANQUIER_SUCCESS = 'REGISTER_BANQUIER_SUCCESS';

// Action creators
const registerBanquierSuccess = (data) => {
  return {
    type: REGISTER_BANQUIER_SUCCESS,
    payload: data,
  };
};

export const registerBanquier = (requestData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:8200/api/v1/auth/banquier/register',
        requestData
      );
      // Dispatch a success action with the response data
      dispatch(registerBanquierSuccess(response.data));
      
      // Return the response data after successful registration
      return response.data;
    } catch (error) {
      // Handle the error, if any
      console.error('Error registering banquier:', error);
    }
  };
};
