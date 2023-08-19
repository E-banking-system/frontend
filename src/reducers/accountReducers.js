const initialState = {
    loading: false,
    updating: false,
    error: null,
    data: [],
    totalBalance: null,
    lastOp: null,
    operationsCountByTime: [],
    operationsAllCountByTime: [],
    sizeActiveAccount: 0
  };
  
  const accountReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ACCOUNT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'ADD_ACCOUNT_SUCCESS':
        return { ...state, loading: false };
      case 'ADD_ACCOUNT_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_ACCOUNTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_ACCOUNTS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_ACCOUNTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_ACCOUNT_REQUEST':
        return { ...state, updating: true, error: null };
      case 'UPDATE_ACCOUNT_SUCCESS':
        return { ...state, updating: false, error: null };
      case 'UPDATE_ACCOUNT_FAILURE':
        return { ...state, updating: false, error: action.error };
      case 'FETCH_ACCOUNT_OPERATIONS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_ACCOUNT_OPERATIONS_SUCCESS':
        return { ...state, loading: false, data: action.payload, error: null };
      case 'FETCH_ACCOUNT_OPERATIONS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_TOTAL_BALANCE_CLIENT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_TOTAL_BALANCE_CLIENT_SUCCESS':
        return { ...state, loading: false, totalBalance: action.payload, error: null };
      case 'FETCH_TOTAL_BALANCE_CLIENT_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_OPERATIONS_COUNT_SUCCESS':
        return { ...state, operationsCountByTime: action.payload };
      case 'FETCH_ALL_OPERATIONS_COUNT_SUCCESS':
        return { ...state, operationsAllCountByTime: action.payload };  
      case 'FETCH_SIZE_ACTIVE_ACCOUNT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_SIZE_ACTIVE_ACCOUNT_SUCCESS':
        return { ...state, loading: false, sizeActiveAccount: action.payload, error: null };
      case 'FETCH_SIZE_ACTIVE_ACCOUNT_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_LAST_OP_CLIENT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_LAST_OP_CLIENT_SUCCESS':
        return { ...state, loading: false, lastOp: action.payload, error: null };
      case 'FETCH_LAST_OP_CLIENT_FAILURE':
        return { ...state, loading: false, error: action.payload };  
      default:
        return state;
    }
  };
  
  export default accountReducer;
  