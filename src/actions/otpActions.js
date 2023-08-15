import axios from 'axios';
import config from '../config';

const GENERATE_OTP_TOKEN_REQUEST = 'GENERATE_OTP_TOKEN_REQUEST';
const GENERATE_OTP_TOKEN_SUCCESS = 'GENERATE_OTP_TOKEN_SUCCESS';
const GENERATE_OTP_TOKEN_FAILURE = 'GENERATE_OTP_TOKEN_FAILURE';

export const generateOtpToken = () => async (dispatch) => {
  dispatch({ type: GENERATE_OTP_TOKEN_REQUEST });

  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('user_id')

  try {
    const response = await axios.post(config.apiURI + '/generate_token', userId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("otp: " + response.data)
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
