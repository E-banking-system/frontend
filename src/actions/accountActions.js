import axios from 'axios';
import config from '../config';

const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE';

const addAccountRequest = () => ({ type: ADD_ACCOUNT_REQUEST });
const addAccountSuccess = () => ({ type: ADD_ACCOUNT_SUCCESS });
const addAccountFailure = (error) => ({ type: ADD_ACCOUNT_FAILURE, payload: error });

const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

const fetchAccountsRequest = () => ({ type: FETCH_ACCOUNTS_REQUEST });
const fetchAccountsSuccess = (data) => ({ type: FETCH_ACCOUNTS_SUCCESS, payload: data });
const fetchAccountsFailure = (error) => ({ type: FETCH_ACCOUNTS_FAILURE, payload: error });


export const fetchAccounts = (accountsToShow) => {
  return (dispatch) => {
    dispatch(fetchAccountsRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios
      .get(config.apiURI + `/api/v1/compte?page=0&size=${accountsToShow}&sortBy=id`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      })
      .then((response) => {
        dispatch(fetchAccountsSuccess(response.data.content));
      })
      .catch((error) => {
        dispatch(fetchAccountsFailure(error.message));
      });
  };
};

export const addAccount = (accountData) => {
  return (dispatch) => {
    dispatch(addAccountRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios
      .post(config.apiURI + '/api/v1/compte', accountData, {
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
