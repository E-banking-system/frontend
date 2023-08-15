const initialState = {
  loading: false,
  token: null,
  error: null,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_OTP_TOKEN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GENERATE_OTP_TOKEN_SUCCESS':
      return { ...state, loading: false, token: action.payload, error: null };
    case 'GENERATE_OTP_TOKEN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default otpReducer;
