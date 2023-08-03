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
      })
      .catch(error => {
        dispatch(fetchBeneficiairesFailure(error.message));
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
        dispatch(deleteBeneficiaireFailure(error.message));
      });
  };
};