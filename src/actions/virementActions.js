import axios from 'axios';
import config from '../config';

const EFFECTUER_VIREMENT_REQUEST = 'EFFECTUER_VIREMENT_REQUEST';
const EFFECTUER_VIREMENT_SUCCESS = 'EFFECTUER_VIREMENT_SUCCESS';
const EFFECTUER_VIREMENT_FAILURE = 'EFFECTUER_VIREMENT_FAILURE';

export const effectuerVirement = (virementData) => {
  return (dispatch) => {
    dispatch({ type: EFFECTUER_VIREMENT_REQUEST });

    const accessToken = localStorage.getItem('accessToken');

    // Set the Authorization header with the access token
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    axios.post(config.apiURI + '/api/v1/virement/unitaire', virementData, { headers })
      .then(response => {
        dispatch({
          type: EFFECTUER_VIREMENT_SUCCESS,
          payload: response.data.message
        });
      })
      .catch(error => {
        dispatch({
          type: EFFECTUER_VIREMENT_FAILURE,
          payload: error.message
        });
      });
  };
};
