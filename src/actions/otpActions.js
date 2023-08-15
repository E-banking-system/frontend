import axios from 'axios';
import config from '../config';


const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('user_id');

// generate the otp token
const GENERATE_OTP_TOKEN_REQUEST = 'GENERATE_OTP_TOKEN_REQUEST';
const GENERATE_OTP_TOKEN_SUCCESS = 'GENERATE_OTP_TOKEN_SUCCESS';
const GENERATE_OTP_TOKEN_FAILURE = 'GENERATE_OTP_TOKEN_FAILURE';

export const generateOtpToken = () => async (dispatch, getState) => {
  dispatch({ type: GENERATE_OTP_TOKEN_REQUEST });


  try {
    const response = await axios.post(config.apiURI + '/api/v1/virement/generate_token', { userId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    dispatch({
      type: GENERATE_OTP_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_OTP_TOKEN_FAILURE,
      payload: error.response.data,
    });
  }
};


// verify the otp token
const verifyOtpTokenRequest = () => ({
    type: 'VERIFY_OTP_TOKEN_REQUEST',
  });
  
  const verifyOtpTokenSuccess = () => ({
    type: 'VERIFY_OTP_TOKEN_SUCCESS',
  });
  
  const verifyOtpTokenFailure = (error) => ({
    type: 'VERIFY_OTP_TOKEN_FAILURE',
    payload: error,
  });
  
  export const verifyOtpToken = (data) => async (dispatch) => {
    dispatch(verifyOtpTokenRequest());
  
    const modifiedData = {
        ...data,
        userId: userId,
      };
  
    try {
      const response = await axios.post(config.apiURI + '/api/v1/virement/verify_token', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(verifyOtpTokenSuccess());
      return response;
    } catch (error) {
      dispatch(verifyOtpTokenFailure(error.response.data));
    }
  };
  