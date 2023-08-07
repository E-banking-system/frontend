import axios from 'axios';
import config from '../config';

const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';

const fetchUserInfoSuccess = (userInfo) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: userInfo,
});

const updateUserInfoSuccess = (updatedUserInfo) => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload: updatedUserInfo,
});

const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('user_id');


export const fetchUserInfo = () => async (dispatch) => {
    try {
        const response = await axios.get(
        `${config.apiURI}/api/v1/auth/infos?userId=${userId}`,
        {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
        );
        const userInfo = response.data;
        dispatch(fetchUserInfoSuccess(userInfo));
    } catch (error) {
        // Handle error
    }
};

export const updateUserInfo = (updatedData) => async (dispatch) => {
    try {
        console.log(JSON.stringify(updatedData));
        const newData = {
            userId: updatedData.id,
            operateur: updatedData.operateur
          };
        const response = await axios.put(
        `${config.apiURI}/api/v1/auth/operateur`,
        newData,
        {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
        }
        );
        const updatedUserInfo = response.data;
        console.log("hey:"+updateUserInfo);
        dispatch(updateUserInfoSuccess(updatedUserInfo));
    } catch (error) {
        // Handle error
    }
};