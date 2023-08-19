import axios from 'axios';
import config from '../config';
import { data } from 'autoprefixer';

// Get the access token from local storage
const accessToken = localStorage.getItem('accessToken');

// Add account
const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE';

// Action creators
const addAccountRequest = () => ({ type: ADD_ACCOUNT_REQUEST }); // this returns an action object with a type of ADD_ACCOUNT_REQUEST
const addAccountSuccess = () => ({ type: ADD_ACCOUNT_SUCCESS }); // this returns an action object with a type of ADD_ACCOUNT_SUCCESS
const addAccountFailure = (error) => ({ type: ADD_ACCOUNT_FAILURE, payload: error }); // this takes an error parameter and returns an action object with a type of ADD_ACCOUNT_FAILURE

export const addAccount = (accountData) => {
  return (dispatch) => {
    
    if (accountData.solde < 100) {
      dispatch(addAccountFailure("Le solde doit être supérieur à 100"));
      return;
    }

    // Dispatching an action to indicate that the account addition is being requested
    dispatch(addAccountRequest());

    axios
      .post(config.apiURI + '/api/v1/compte', accountData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the request headers
        },
      })
      .then((response) => {
        // Dispatching an action to indicate that the account addition succeded
        dispatch(addAccountSuccess());
      })
      .catch((error) => {
        // Dispatching an action to indicate that the account addition failed
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
      console.info("accounts fetched successfully");
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
  
  // check if the new account state is not the same as the old state to avoid updating the account state with the same state
  if(updatedData.etatCompte !== updatedData.oldetatCompte){
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
      console.info("account updated successfully");
    } catch (statusError) {
      dispatch(updateAccountFailure("vous pouvez pas modifier l'état compte"));
      throw new Error("vous pouvez pas modifier l'état compte"); 
    }
  }
        
    // Attempt to change account balance
    // we retrieve the necessary fields from updatedData and store it in data to send it within our POST request
    const data = { ...updatedData };

    delete data.etatCompte;
    delete data['id'];
    
    data['montant'] = data['solde'];
    delete data['solde'];

    // If the account is not active, don't update the balance
    if(updatedData.etatCompte !== 'ACTIVE' && updatedData.solde !== 0){
      throw new Error("Le compte n'est pas active, vous pouvez pas modifier le solde");
      //return;
    }
    
    // if the amount is > 0 we perform a deposit 
    if (data.montant > 0) {
      try {
        await axios.post(config.apiURI + '/api/v1/compte/depot', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (balanceError) {
        
      }
    } 
    
    // if the ammount is < 0 we perform a withdrawal
    if (data.montant < 0) {
      try {
        await axios.post(config.apiURI + '/api/v1/compte/retrait', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (balanceError) {
        //dispatch(updateAccountFailure("solde à retirer est inférieur au solde initial"));
        //throw new Error("solde à retirer est supérieur au solde initial"); 
      }
    }
};


// this action is similar to the previous one but this is gonna be needed in Notification component in backoffice dashbord
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
    console.info("account updated successfully");
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
        console.info('API Response:', response); // Check the response object in the console
        dispatch(fetchAccountsSuccess(response.data.content)); // Make sure the action is dispatched correctly
      })
      .catch((error) => {
        console.warn('API Error:', error); // Check for any errors in the console
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
        console.info("demande recieved");
      })
      .catch((error) => {
        dispatch(demandeActivationFailure(error.message));
        console.warn("erroneous demand");
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
        console.info("demande recieved");
      })
      .catch((error) => {
        dispatch(demandeSuspensionFailure(error.message));
        console.warn("erroneous demand");
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
        console.info("demande recieved");
      })
      .catch((error) => {
        dispatch(demandeBlockFailure(error.message));
        console.warn("erroneous demand");
      });
  };
};


// Account operations

const fetchAccountOperationsRequest = () => ({
  type: 'FETCH_ACCOUNT_OPERATIONS_REQUEST',
});

const fetchAccountOperationsSuccess = (data) => ({
  type: 'FETCH_ACCOUNT_OPERATIONS_SUCCESS',
  payload: data,
});

const fetchAccountOperationsFailure = (error) => ({
  type: 'FETCH_ACCOUNT_OPERATIONS_FAILURE',
  payload: error,
});

export const fetchAccountOperations = (compteId, visibleOps) => {
  return async (dispatch) => {
    dispatch(fetchAccountOperationsRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id')

    try {
      const response = await axios.get(`${config.apiURI}/api/v1/compte/operations?compteId=${compteId}&page=0&size=${visibleOps}&userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(fetchAccountOperationsSuccess(response.data.content));
      console.info('fetch operations succeeded');
    } catch (error) {
      dispatch(fetchAccountOperationsFailure(error.message));
      console.warn(error.message);
    }
  };
};

// get total balance of a client

const fetchTotalBalanceClientRequest = () => ({
  type: 'FETCH_TOTAL_BALANCE_CLIENT_REQUEST',
});

const fetchTotalBalanceClientSuccess = (totalBalance) => ({
  type: 'FETCH_TOTAL_BALANCE_CLIENT_SUCCESS',
  payload: totalBalance,
});

const fetchTotalBalanceClientFailure = (error) => ({
  type: 'FETCH_TOTAL_BALANCE_CLIENT_FAILURE',
  payload: error,
});

export const fetchTotalBalanceClient = () => {
  return async (dispatch) => {
    dispatch(fetchTotalBalanceClientRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id')

    try {
      const response = await axios.get(`${config.apiURI}/api/v1/compte/soldeTotalClient?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      dispatch(fetchTotalBalanceClientSuccess(response.data));
      console.info('fetch total balance succeeded');
    } catch (error) {
      dispatch(fetchTotalBalanceClientFailure(error.message));
      console.warn(error.message);
    }
  };
};

// get last operation of a client

const fetchLastOpClientRequest = () => ({
  type: 'FETCH_LAST_OP_CLIENT_REQUEST',
});

const fetchLastOpClientSuccess = (lastOp) => ({
  type: 'FETCH_LAST_OP_CLIENT_SUCCESS',
  payload: lastOp,
});

const fetchLastOpClientFailure = (error) => ({
  type: 'FETCH_LAST_OP_CLIENT_FAILURE',
  payload: error,
});

export const fetchLastOpClient = () => {
  return async (dispatch) => {
    dispatch(fetchLastOpClientRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id')

    try {
      const response = await axios.get(`${config.apiURI}/api/v1/compte/latestOperationClient?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      dispatch(fetchLastOpClientSuccess(response.data));
      console.log("date: " + response.data);
      console.info('fetch last operation succeeded');
    } catch (error) {
      dispatch(fetchLastOpClientFailure(error.message));
      console.warn(error.message);
    }
  };
};

// get last operation of all clients

const fetchLastOpRequest = () => ({
  type: 'FETCH_LAST_OP_REQUEST',
});

const fetchLastOpSuccess = (lastOp) => ({
  type: 'FETCH_LAST_OP_SUCCESS',
  payload: lastOp,
});

const fetchLastOpFailure = (error) => ({
  type: 'FETCH_LAST_OP_FAILURE',
  payload: error,
});

export const fetchLastOp = () => {
  return async (dispatch) => {
    dispatch(fetchLastOpRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.get(`${config.apiURI}/api/v1/compte/latestOperation`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      dispatch(fetchLastOpSuccess(response.data));
      console.info('fetch last operation succeeded');
    } catch (error) {
      dispatch(fetchLastOpFailure(error.message));
      console.warn(error.message);
    }
  };
};


// get number of active clients

const fetchSizeActiveAccountRequest = () => ({
  type: 'FETCH_SIZE_ACTIVE_ACCOUNT_REQUEST',
});

const fetchSizeActiveAccountSuccess = (sizeActiveAccount) => ({
  type: 'FETCH_SIZE_ACTIVE_ACCOUNT_SUCCESS',
  payload: sizeActiveAccount,
});

const fetchSizeActiveAccountFailure = (error) => ({
  type: 'FETCH_SIZE_ACTIVE_ACCOUNT_FAILURE',
  payload: error,
});

export const fetchCountActiveAccount = () => {
  return async (dispatch) => {
    dispatch(fetchSizeActiveAccountRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    try {      
      const response = await axios.get(`${config.apiURI}/api/v1/compte/getCountActiveAccount`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      dispatch(fetchSizeActiveAccountSuccess(response.data));
      console.info('fetch last operation succeeded');
    } catch (error) {
      dispatch(fetchSizeActiveAccountFailure(error.message));
      console.warn(error.message);
    }
  };
};

// fetching number of operations of a client in function of time

export const fetchOperationsCountByTime = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id')

    const response = await axios.get(`${config.apiURI}/api/v1/compte/countClientOpsByTime?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    dispatch({ type: 'FETCH_OPERATIONS_COUNT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_OPERATIONS_COUNT_FAILURE', payload: error.message });
  }
};

// fetching number of all operations in function of time

export const fetchAllOperationsCountByTime = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(`${config.apiURI}/api/v1/compte/countAllOpsByTime`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: 'FETCH_ALL_OPERATIONS_COUNT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ALL_OPERATIONS_COUNT_FAILURE', payload: error.message });
  }
};