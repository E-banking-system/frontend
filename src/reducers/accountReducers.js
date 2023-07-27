const initialState = {
    loading: false,
    error: null,
  };
  
  const accountReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ACCOUNT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'ADD_ACCOUNT_SUCCESS':
        return { ...state, loading: false };
      case 'ADD_ACCOUNT_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default accountReducer;
  