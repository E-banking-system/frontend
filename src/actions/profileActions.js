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
        
        // store the name of the current user to display it in the header
        localStorage.setItem("nom", userInfo.nom);
        localStorage.setItem("prenom", userInfo.nom);

        dispatch(fetchUserInfoSuccess(userInfo));
        console.info("successfull user info fetching");
    } catch (error) {
        console.warn("no user info found.");
    }
};

export const updateUserInfo = (updatedData) => async (dispatch) => {
    try {
        
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
       
        dispatch(updateUserInfoSuccess(updatedUserInfo));
        console.info("successfull user info updating");
    } catch (error) {
        console.warn("can't user info ");
    }
};