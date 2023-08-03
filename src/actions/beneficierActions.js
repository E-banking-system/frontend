import axios from 'axios';
import config from '../config';

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

export const fetchBeneficiaires = () => {
    
    const accessToken = localStorage.getItem('accessToken');

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
