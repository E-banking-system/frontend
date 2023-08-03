const initialState = {
  loading: false,
  beneficiaires: [], 
  error: null
};

const beneficiaireReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BENEFICIAIRES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_BENEFICIAIRES_SUCCESS':
      return {
        ...state,
        loading: false,
        beneficiaires: action.payload,
        error: null,
      };
    case 'FETCH_BENEFICIAIRES_FAILURE':
      return {
        ...state,
        loading: false,
        beneficiaires: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default beneficiaireReducer;
