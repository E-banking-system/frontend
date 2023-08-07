const initialState = {
    loading: false,
    virementId: null,
    error: null,
    data: null,
    virements: [],
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
      case 'VIREMENT_PERMANENT_REQUEST':
        return {
          ...state,
          loading: true,
          data: null,
          error: null,
        };
      case 'VIREMENT_PERMANENT_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case 'VIREMENT_PERMANENT_FAILURE':
        return {
          ...state,
          loading: false,
          data: null,
          error: action.payload,
        };
      case 'FETCH_VIREMENTS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_VIREMENTS_SUCCESS':
        return {
          ...state,
          loading: false,
          virements: action.payload,
          error: null,
        };
      case 'FETCH_VIREMENTS_FAILURE':
        return {
          ...state,
          loading: false,
          virements: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default virementReducer;