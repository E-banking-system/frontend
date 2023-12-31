import axios from 'axios';
import config from '../config';

// fetching the beneficiaires
const fetchBeneficiairesRequest = () => ({
  type: 'FETCH_BENEFICIAIRES_REQUEST',
});

const fetchBeneficiairesSuccess = (beneficiaires) => ({
  type: 'FETCH_BENEFICIAIRES_SUCCESS',
  payload: beneficiaires,
});

const fetchBeneficiairesFailure = (error) => ({
  type: 'FETCH_BENEFICIAIRES_FAILURE',
  payload: error,
});

const accessToken = localStorage.getItem('accessToken');

export const fetchBeneficiaires = () => {

    const clientId = localStorage.getItem('user_id');

  return (dispatch) => {
    dispatch(fetchBeneficiairesRequest());

    // Set the Authorization header with the access token
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    axios.get(config.apiURI + '/api/v1/beneficier?clientId=' + clientId, { headers }) 
      .then(response => {
        dispatch(fetchBeneficiairesSuccess(response.data.content));
        console.info("successfull beneficiers fetching");
      })
      .catch(error => {
        dispatch(fetchBeneficiairesFailure(error.message));
        console.warn("can't fetch beneficiers");
      });
  };
};


// adding beneficiaire
const addBeneficiaireRequest = () => ({
  type: 'ADD_BENEFICIAIRE_REQUEST',
});

const addBeneficiaireSuccess = (beneficiaire) => ({
  type: 'ADD_BENEFICIAIRE_SUCCESS',
  payload: beneficiaire,
});

const addBeneficiaireFailure = (error) => ({
  type: 'ADD_BENEFICIAIRE_FAILURE',
  payload: error,
});

export const addBeneficiaire = (formData) => {
  return (dispatch) => {
    dispatch(addBeneficiaireRequest());

    return axios.post(config.apiURI + '/api/v1/beneficier', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        dispatch(addBeneficiaireSuccess(response.data));
        dispatch(fetchBeneficiaires());
        console.info("successfull adding a beneficier");
        return response.data; // Return the response data
      })
      .catch(error => {
        dispatch(fetchBeneficiaires());
        throw error; // Rethrow the error to be caught in handleSubmit
      });
  };
};

// deleting beneficiaire
const deleteBeneficiaireRequest = () => ({
  type: 'DELETE_BENEFICIAIRE_REQUEST',
});

const deleteBeneficiaireSuccess = (beneficiaireId) => ({
  type: 'DELETE_BENEFICIAIRE_SUCCESS',
  payload: beneficiaireId,
});

const deleteBeneficiaireFailure = (error) => ({
  type: 'DELETE_BENEFICIAIRE_FAILURE',
  payload: error,
});

export const deleteBeneficiaire = (beneficiaireId) => {
  return (dispatch) => {
    dispatch(deleteBeneficiaireRequest());

    axios
      .delete(config.apiURI + `/api/v1/beneficier/${beneficiaireId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        dispatch(deleteBeneficiaireSuccess(beneficiaireId));
        dispatch(fetchBeneficiaires()); // to refresh the list
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          dispatch(deleteBeneficiaireFailure("You are not allowed to delete this beneficiary."));
          dispatch(fetchBeneficiaires());
          console.warn("You are not allowed to delete this beneficiary.");
        } else {
          dispatch(deleteBeneficiaireFailure("An error occurred while deleting the beneficiary."));
          dispatch(fetchBeneficiaires());
          console.warn("An error occurred while deleting the beneficiary.");
        }
      });
  };
};

// Update Beneficier
export const updateBeneficiaireRequest = () => {
  return {
    type: 'UPDATE_BENEFICIAIRE_REQUEST',
  };
};

export const updateBeneficiaireSuccess = () => {
  return {
    type: 'UPDATE_BENEFICIAIRE_SUCCESS',
  };
};

export const updateBeneficiaireFailure = (error) => {
  return {
    type: 'UPDATE_BENEFICIAIRE_FAILURE',
    payload: error.response ? error.response.data.message : 'Num compte introuvable',
  };
};

export const updateBeneficiaire = (beneficierId, updatedData) => {
  return async (dispatch) => {
    dispatch(updateBeneficiaireRequest());
    
    try {
      const response = await axios.put(
        `${config.apiURI}/api/v1/beneficier/${beneficierId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(updateBeneficiaireSuccess());
      dispatch(fetchBeneficiaires());
      console.info("successfull beneficier updating");
      return response;
    } catch (error) {
      dispatch(updateBeneficiaireFailure(error.updateError));
      console.warn("can't update beneficier " + error.updateError);
    }
  };
};