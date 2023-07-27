import axios from 'axios';
import config from '../config';

const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE';

const addAccountRequest = () => ({ type: ADD_ACCOUNT_REQUEST });
const addAccountSuccess = () => ({ type: ADD_ACCOUNT_SUCCESS });
const addAccountFailure = (error) => ({ type: ADD_ACCOUNT_FAILURE, payload: error });

export const addAccount = (accountData) => {
  return (dispatch) => {
    dispatch(addAccountRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios
      .post(config.apiURI + '/api/v1/banquier/suiteRegistrationClient', accountData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      })
      .then((response) => {
        dispatch(addAccountSuccess());
      })
      .catch((error) => {
        dispatch(addAccountFailure(error.message));
      });
  };
};
