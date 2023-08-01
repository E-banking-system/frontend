import axios from 'axios';
import config from '../config';

const FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST';
const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';

// Action Creators
const fetchNotificationsRequest = () => ({
  type: FETCH_NOTIFICATIONS_REQUEST,
});

const fetchNotificationsSuccess = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

const fetchNotificationsFailure = (error) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});

// Async Action: Fetch notifications
export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(fetchNotificationsRequest());
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');
    axios
      .get(`${config.apiURI}/api/v1/notification?page=0&size=1&sortBy=dateEnvoie&userId=${user_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const notificationsData = response.data.content;
        dispatch(fetchNotificationsSuccess(notificationsData));
      })
      .catch((error) => {
        console.error('API Error:', error);
        dispatch(fetchNotificationsFailure(error.message));
      });
  };
};
