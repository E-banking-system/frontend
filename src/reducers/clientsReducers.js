const initialState = {
clients: [],
loading: false,
error: null,
};

const clientsReducer = (state = initialState, action) => {
switch (action.type) {
    case 'FETCH_CLIENTS_REQUEST':
    return {
        ...state,
        loading: true,
        error: null,
    };
    case 'FETCH_CLIENTS_SUCCESS':
    return {
        ...state,
        loading: false,
        clients: action.payload,
    };
    case 'FETCH_CLIENTS_FAILURE':
    return {
        ...state,
        loading: false,
        error: action.payload,
    };
    default:
    return state;
}
};

export default clientsReducer;
