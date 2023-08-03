const initialState = {
  beneficiaires: [],
  loading: false,
  error: null,
};

const beneficierReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BENEFICIAIRES_REQUEST':
    case 'ADD_BENEFICIAIRE_REQUEST':
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
      };
    case 'ADD_BENEFICIAIRE_SUCCESS':
      return {
        ...state,
        loading: false,
        beneficiaires: [...state.beneficiaires, action.payload],
      };
    case 'FETCH_BENEFICIAIRES_FAILURE':
    case 'ADD_BENEFICIAIRE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'DELETE_BENEFICIAIRE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'DELETE_BENEFICIAIRE_SUCCESS':
        return {
          ...state,
          beneficiaires: state.beneficiaires.filter(
            (beneficiaire) => beneficiaire.id !== action.payload
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_BENEFICIAIRE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default beneficierReducer;
