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

export const fetchClients = (page, size) => {
  return (dispatch) => {
    dispatch(fetchClientsRequest());
    axios
      .get(config.apiURI + `/api/v1/banquier/clients?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(fetchClientsSuccess(response.data.content));
        console.log(response.data.content);
      })
      .catch((error) => {
        dispatch(fetchClientsFailure(error.message));
      });
  };
};
