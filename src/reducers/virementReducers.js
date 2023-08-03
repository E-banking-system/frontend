const initialState = {
    loading: false,
    virementId: null,
    error: null
  };
  
  const virementReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'EFFECTUER_VIREMENT_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'EFFECTUER_VIREMENT_SUCCESS':
        return {
          ...state,
          loading: false,
          virementId: action.payload,
          error: null
        };
      case 'EFFECTUER_VIREMENT_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default virementReducer;