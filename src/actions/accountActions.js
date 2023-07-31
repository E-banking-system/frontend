import axios from 'axios';
import config from '../config';


// Get the access token from local storage
const accessToken = localStorage.getItem('accessToken');

// Add account
const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE';

const addAccountRequest = () => ({ type: ADD_ACCOUNT_REQUEST });
const addAccountSuccess = () => ({ type: ADD_ACCOUNT_SUCCESS });
const addAccountFailure = (error) => ({ type: ADD_ACCOUNT_FAILURE, payload: error });

export const addAccount = (accountData) => {
  return (dispatch) => {
    dispatch(addAccountRequest());

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



// fetch accounts Banquier
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



// update account state
const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';
const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

const updateAccountRequest = () => ({
  type: UPDATE_ACCOUNT_REQUEST,
});

const updateAccountSuccess = (updatedData) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: updatedData,
});

const updateAccountFailure = (error) => ({
  type: UPDATE_ACCOUNT_FAILURE,
  payload: error,
});

export const updateAccount = (updatedData) => async (dispatch) => {
  dispatch(updateAccountRequest());
  try {
    // Make the API call based on the selected etatCompte value
    let endpoint = '';
    if (updatedData.etatCompte === 'SUSPENDU') {
      endpoint = config.apiURI + '/api/v1/compte/suspender';
    } else if (updatedData.etatCompte === 'BLOCKE') {
      endpoint = config.apiURI + '/api/v1/compte/blocker';
    } else if (updatedData.etatCompte === 'ACTIVE') {
      endpoint = config.apiURI + '/api/v1/compte/activer';
    } 
    

    const response = await axios.post(`${endpoint}`, updatedData.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
      },
    });

    const data = { ...updatedData };
    delete data.etatCompte;
    // Rename the 'id' property to 'compteId'
    data['compteId'] = data['id'];
    delete data['id'];

    // Rename the 'solde' property to 'montant'
    data['montant'] = data['solde'];
    delete data['solde'];


console.log(data);
    if(data.solde !== 0){
      await axios.post(config.apiURI + '/api/v1/compte/change_solde', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      });
    }

    dispatch(updateAccountSuccess(response.data));
    console.log('Account Updated');
    
  } catch (error) {
    dispatch(updateAccountFailure(error.message));
    console.error('Error updating account:', error.message);
  }
};


// fetch accounts Client

export const fetchAccountsClient = () => {
  return (dispatch) => {
    dispatch(fetchAccountsRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios
      .get(config.apiURI + `/api/v1/client/comptes?userId=4ade6610-bc69-4f3c-ace5-83568a22472f`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      })
      .then((response) => {
        console.log('API Response:', response); // Check the response object in the console
        dispatch(fetchAccountsSuccess(response.data)); // Make sure the action is dispatched correctly
      })
      .catch((error) => {
        console.error('API Error:', error); // Check for any errors in the console
        dispatch(fetchAccountsFailure(error.message));
      });
  };
};

// Client demande activation
const demandeActivationRequest = () => {
  return {
    type: 'DEMANDE_ACTIVATION_REQUEST',
  };
};

const demandeActivationSuccess = (response) => {
  return {
    type: 'DEMANDE_ACTIVATION_SUCCESS',
    payload: response,
  };
};

const demandeActivationFailure = (error) => {
  return {
    type: 'DEMANDE_ACTIVATION_FAILURE',
    payload: error,
  };
};

export const demandeActivation = (accountId) => {
  return (dispatch) => {
    dispatch(demandeActivationRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    console.log(accountId);
    axios
      .post(
        `${config.apiURI}/api/v1/compte/demande_activer`,
        {
          compteId: accountId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch(demandeActivationSuccess(response.data));
      })
      .catch((error) => {
        dispatch(demandeActivationFailure(error.message));
      });
  };
};


// Client demande suspension
const demandeSuspensionRequest = () => {
  return {
    type: 'DEMANDE_SUSPENSION_REQUEST',
  };
};

const demandeSuspensionSuccess = (response) => {
  return {
    type: 'DEMANDE_SUSPENSION_SUCCESS',
    payload: response,
  };
};

const demandeSuspensionFailure = (error) => {
  return {
    type: 'DEMANDE_SUSPENSION_FAILURE',
    payload: error,
  };
};

export const demandeSuspension = (accountId) => {
  return (dispatch) => {
    dispatch(demandeSuspensionRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    console.log(accountId);
    axios
      .post(
        `${config.apiURI}/api/v1/compte/demande_suspend`,
        {
          compteId: accountId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch(demandeSuspensionSuccess(response.data));
      })
      .catch((error) => {
        dispatch(demandeSuspensionFailure(error.message));
      });
  };
};


// Client demande bloquage
const demandeBlockRequest = () => {
  return {
    type: 'DEMANDE_BLOCK_REQUEST',
  };
};

const demandeBlockSuccess = (response) => {
  return {
    type: 'DEMANDE_BLOCK_SUCCESS',
    payload: response,
  };
};

const demandeBlockFailure = (error) => {
  return {
    type: 'DEMANDE_BLOCK_FAILURE',
    payload: error,
  };
};

export const demandeBlock = (accountId) => {
  return (dispatch) => {
    dispatch(demandeBlockRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    console.log(accountId);
    axios
      .post(
        `${config.apiURI}/api/v1/compte/demande_block`,
        {
          compteId: accountId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch(demandeBlockSuccess(response.data));
      })
      .catch((error) => {
        dispatch(demandeBlockFailure(error.message));
      });
  };
};