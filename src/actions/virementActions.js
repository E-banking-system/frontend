// Virement Unitaire
import axios from 'axios';
import config from '../config';

const accessToken = localStorage.getItem('accessToken');

const EFFECTUER_VIREMENT_REQUEST = 'EFFECTUER_VIREMENT_REQUEST';
const EFFECTUER_VIREMENT_SUCCESS = 'EFFECTUER_VIREMENT_SUCCESS';
const EFFECTUER_VIREMENT_FAILURE = 'EFFECTUER_VIREMENT_FAILURE';

export const effectuerVirement = (virementData) => {
    return async (dispatch) => {
      dispatch({ type: EFFECTUER_VIREMENT_REQUEST });
  
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
  
      try {
        const response = await axios.post(config.apiURI + '/api/v1/virement/unitaire', virementData, { headers });
        
        dispatch({
          type: EFFECTUER_VIREMENT_SUCCESS,
          payload: response.data
        });
  
        return response.data; 
      } catch (error) {
        dispatch({
          type: EFFECTUER_VIREMENT_FAILURE,
          payload: error.message || 'An error occurred during the virement process'
        });
  
        throw error; // Rethrow the error to be caught in the try-catch block where the action is dispatched
      }
    };
};
  

// Virement Permanant
const VIREMENT_PERMANENT_REQUEST = 'VIREMENT_PERMANENT_REQUEST';
const VIREMENT_PERMANENT_SUCCESS = 'VIREMENT_PERMANENT_SUCCESS';
const VIREMENT_PERMANENT_FAILURE = 'VIREMENT_PERMANENT_FAILURE';

const effectuerVirementPermanentRequest = () => ({
  type: VIREMENT_PERMANENT_REQUEST,
});

const effectuerVirementPermanentSuccess = (response) => ({
  type: VIREMENT_PERMANENT_SUCCESS,
  payload: response.data.message, // Capture the success message from the server response
});

const effectuerVirementPermanentFailure = (error) => ({
  type: VIREMENT_PERMANENT_FAILURE,
  payload: error.response ? error.response.data.message : 'Une erreur est survenue lors de l\'opération', // Capture the error message from the server response, or use a default message
});

export const effectuerVirementPermanent = (formData) => async (dispatch) => {
  dispatch(effectuerVirementPermanentRequest());
  try {
    const response = await axios.post(config.apiURI + '/api/v1/virement/permanent', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(effectuerVirementPermanentSuccess(response));
  } catch (error) {
    dispatch(effectuerVirementPermanentFailure(error));
  }
};


// fetch virement
// const fetchVirementsRequest = () => ({
//   type: 'FETCH_VIREMENTS_REQUEST',
// });

// const fetchVirementsSuccess = (virements) => ({
//   type: 'FETCH_VIREMENTS_SUCCESS',
//   payload: virements,
// });

// const fetchVirementsFailure = (error) => ({
//   type: 'FETCH_VIREMENTS_FAILURE',
//   payload: error,
// });

// export const fetchVirements = (userId, page, size) => {
//   return (dispatch) => {
//     dispatch(fetchVirementsRequest());
//     axios
//       .get(config.apiURI + `/api/v1/client/virements?userId=${userId}&page=${page}&size=${size}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         dispatch(fetchVirementsSuccess(response.data.content));
//       })
//       .catch((error) => {
//         dispatch(fetchVirementsFailure(error.message));
//       });
//   };
// };
