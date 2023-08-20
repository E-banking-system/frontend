import axios from 'axios';
import config from '../config';

const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('user_id');

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
        console.warn("erroneous fetching");
      });
  };
};


// fetching number of notifications for a client

const fetchNbrNotifRequest = () => ({
  type: 'FETCH_NBRNOTIF_REQUEST',
});

const fetchNbrNotifSuccess = (nbrNotif) => ({
  type: 'FETCH_NBRNOTIF_SUCCESS',
  payload: nbrNotif,
});

const fetchNbrNotifFailure = (error) => ({
  type: 'FETCH_NBRNOTIF_FAILURE',
  payload: error,
});

export const fetchNbrNotif = () => {
  return (dispatch) => {
    dispatch(fetchNbrNotifRequest());
    axios
      .get(config.apiURI + `/api/v1/client/nbrNotification?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(fetchNbrNotifSuccess(response.data));
        console.info("successfull notifications count fetching");
        return response.data;
      })
      .catch((error) => {
        dispatch(fetchNbrNotifFailure(error.message));
        console.warn("erroneous fetching");
      });
  };
};


// fetching number of messages for a client

const fetchNbrMsgRequest = () => ({
  type: 'FETCH_NBRMSG_REQUEST',
});

const fetchNbrMsgSuccess = (nbrMsg) => ({
  type: 'FETCH_NBRMSG_SUCCESS',
  payload: nbrMsg,
});

const fetchNbrMsgFailure = (error) => ({
  type: 'FETCH_NBRMSG_FAILURE',
  payload: error,
});

export const fetchNbrMsg = () => {
  return (dispatch) => {
    dispatch(fetchNbrMsgRequest());
    axios
      .get(config.apiURI + `/api/v1/client/nbrMessages?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(fetchNbrMsgSuccess(response.data));
        console.info("successfull messages count fetching");
        return response.data;
      })
      .catch((error) => {
        dispatch(fetchNbrMsgFailure(error.message));
        console.warn("erroneous fetching");
      });
  };
};