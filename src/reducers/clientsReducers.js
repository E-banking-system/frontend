const initialState = {
clients: [],
loading: false,
error: null,
nbrNotif: 0,
nbrMsg: 0,
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
    case 'FETCH_NBRNOTIF_REQUEST':
    return {
        ...state,
        loading: true,
        error: null,
    };
    case 'FETCH_NBRNOTIF_SUCCESS':
    return {
        ...state,
        loading: false,
        nbrNotif: action.payload,
    };
    case 'FETCH_NBRNOTIF_FAILURE':
    return {
        ...state,
        loading: false,
        error: action.payload,
    };
    case 'FETCH_NBRMSG_REQUEST':
    return {
        ...state,
        loading: true,
        error: null,
    };
    case 'FETCH_NBRMSG_SUCCESS':
    return {
        ...state,
        loading: false,
        nbrMsg: action.payload,
    };
    case 'FETCH_NBRMSG_FAILURE':
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
