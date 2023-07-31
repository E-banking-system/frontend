const initialState = {
loading: false,
notifications: [],
error: null,
};

const notificationReducer = (state = initialState, action) => {
switch (action.type) {
    case 'FETCH_NOTIFICATIONS_REQUEST':
    return {
        ...state,
        loading: true,
        error: null,
    };
    case 'FETCH_NOTIFICATIONS_SUCCESS':
    return {
        ...state,
        loading: false,
        notifications: action.payload,
    };
    case 'FETCH_NOTIFICATIONS_FAILURE':
    return {
        ...state,
        loading: false,
        error: action.payload,
    };
    default:
    return state;
}
};

export default notificationReducer;
