const initialState = {
accessToken: localStorage.getItem("accessToken") || null,
userRole: localStorage.getItem("role") || null,
userId: localStorage.getItem("user_id") || null,
};

const loginReducer = (state = initialState, action) => {
switch (action.type) {
    case "SET_ACCESS_TOKEN":
    return {
        ...state,
        accessToken: action.payload,
    };
    case "SET_USER_ROLE":
    return {
        ...state,
        userRole: action.payload,
    };
    case "SET_USER_ID":
        return {
            ...state,
            userId: action.payload,
        };
    default:
    return state;
}
};

export default loginReducer;
  