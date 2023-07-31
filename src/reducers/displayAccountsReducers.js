const initialState = {
    accounts: [],
    loading: false,
    error: null,
  };
  
  const accountReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ACCOUNTS_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_ACCOUNTS_SUCCESS':
        return {
          ...state,
          loading: false,
          accounts: action.payload,
        };
      case 'FETCH_ACCOUNTS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default accountReducer;
  