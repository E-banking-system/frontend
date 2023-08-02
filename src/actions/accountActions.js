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
    
    if (accountData.solde < 100) {
      dispatch(addAccountFailure("Le solde doit être supérieur à 100"));
      return;
    }

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


export const fetchAccounts = (accountsToShow, keyword) => {
  return async (dispatch) => {
    dispatch(fetchAccountsRequest());

    try {
      // Get the access token from local storage
      const accessToken = localStorage.getItem('accessToken');
      
      // Construct the API endpoint with the search keyword if it exists
      const endpoint =
        keyword && keyword !== ''
          ? config.apiURI +
            `/api/v1/compte?page=0&size=${accountsToShow}&sortBy=id&keyword=${encodeURIComponent(keyword)}`
          : config.apiURI +
            `/api/v1/compte?page=0&size=${accountsToShow}&sortBy=id`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(fetchAccountsSuccess(response.data.content));
      return response.data.content; // Return the fetched data
    } catch (error) {
      dispatch(fetchAccountsFailure(error.message));
      throw error; // Re-throw the error for handling in the component
    }
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
  
  console.log(JSON.stringify(updatedData));
    let endpoint = '';
    if (updatedData.etatCompte === 'SUSPENDU') {
      endpoint = config.apiURI + '/api/v1/compte/suspender';
    } else if (updatedData.etatCompte === 'BLOCKE') {
      endpoint = config.apiURI + '/api/v1/compte/blocker';
    } else if (updatedData.etatCompte === 'ACTIVE') {
      endpoint = config.apiURI + '/api/v1/compte/activer';
    } 

    // Attempt to update account status
    try {
      const response = await axios.post(`${endpoint}`, updatedData.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      });

      dispatch(updateAccountSuccess(response.data)); 
    } catch (statusError) {
      dispatch(updateAccountFailure("vous pouvez pas modifier l'état compte"));
      throw new Error("vous pouvez pas modifier l'état compte"); 
    }
    
    // Attempt to change account balance
    const data = { ...updatedData };

    delete data.etatCompte;
    delete data['id'];
    
    data['montant'] = data['solde'];
    delete data['solde'];

    // If the account is not active, don't update the balance
    if(updatedData.etatCompte !== 'ACTIVE'){
      return;
    }

    if (data.solde !== 0) {
      try {
        await axios.post(config.apiURI + '/api/v1/compte/change_solde', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (balanceError) {
        dispatch(updateAccountFailure("solde à retirer est supérieur au solde initial"));
        throw new Error("solde à retirer est supérieur au solde initial ou le compte n'est pas actif"); 
      }
    }
};


export const updateAccountStateOnly= (updatedData) => async (dispatch) => {
  dispatch(updateAccountRequest());
  
  const { solde, ...updatedDataWithoutBalance } = updatedData; // Exclude 'solde' from updatedData

  let endpoint = '';
  if (updatedDataWithoutBalance.etatCompte === 'SUSPENDU') {
    endpoint = config.apiURI + '/api/v1/compte/suspender';
  } else if (updatedDataWithoutBalance.etatCompte === 'BLOCKE') {
    endpoint = config.apiURI + '/api/v1/compte/blocker';
  } else if (updatedDataWithoutBalance.etatCompte === 'ACTIVE') {
    endpoint = config.apiURI + '/api/v1/compte/activer';
  } 

  // Attempt to update account status
  try {
    const response = await axios.post(`${endpoint}`, updatedDataWithoutBalance.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(updateAccountSuccess(response.data)); 
  } catch (statusError) {
    dispatch(updateAccountFailure("vous pouvez pas modifier l'état compte"));
    throw new Error("vous pouvez pas modifier l'état compte"); 
  }
};



// fetch accounts Client
export const fetchAccountsClient = (keyword) => {
  return (dispatch) => {
    dispatch(fetchAccountsRequest());

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');

    const endpoint = keyword && keyword !== '' ? 
      config.apiURI + `/api/v1/client/comptes?userId=${userId}&keyword=${encodeURIComponent(keyword)}`
      : 
      config.apiURI + `/api/v1/client/comptes?userId=${userId}`;

    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      })
      .then((response) => {
        console.log('API Response:', response); // Check the response object in the console
        dispatch(fetchAccountsSuccess(response.data.content)); // Make sure the action is dispatched correctly
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