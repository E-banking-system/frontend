import axios from 'axios';
import config from '../config';

const accessToken = localStorage.getItem('accessToken');

// fetch clients
const fetchClientsRequest = () => ({
  type: 'FETCH_CLIENTS_REQUEST',
});

const fetchClientsSuccess = (clients) => ({
  type: 'FETCH_CLIENTS_SUCCESS',
  payload: clients,
});

const fetchClientsFailure = (error) => ({
  type: 'FETCH_CLIENTS_FAILURE',
  payload: error,
});

export const fetchClients = (page, size, keyword) => {
  return (dispatch) => {
    dispatch(fetchClientsRequest());
    axios
      .get(config.apiURI + `/api/v1/banquier/clients?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(fetchClientsSuccess(response.data.content));
        console.info("successfull clients fetching");
      })
      .catch((error) => {
        dispatch(fetchClientsFailure(error.message));
        console.warn("successfull erroneous fetching");
      });
  };
};
