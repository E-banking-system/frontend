const initialState = {
  userInfo: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_INFO_SUCCESS':
    case 'UPDATE_USER_INFO_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
