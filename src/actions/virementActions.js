import axios from 'axios';
import config from '../config';

const EFFECTUER_VIREMENT_REQUEST = 'EFFECTUER_VIREMENT_REQUEST';
const EFFECTUER_VIREMENT_SUCCESS = 'EFFECTUER_VIREMENT_SUCCESS';
const EFFECTUER_VIREMENT_FAILURE = 'EFFECTUER_VIREMENT_FAILURE';

export const effectuerVirement = (virementData) => {
    return async (dispatch) => {
      dispatch({ type: EFFECTUER_VIREMENT_REQUEST });
  
      const accessToken = localStorage.getItem('accessToken');
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
  