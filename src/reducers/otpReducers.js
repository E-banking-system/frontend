const initialState = {
    loading: false,
    successMessage: '',
    errorMessage: '',
};

const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GENERATE_OTP_TOKEN_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GENERATE_OTP_TOKEN_SUCCESS':
            return {
                ...state,
                loading: false,
                successMessage: action.payload,
                errorMessage: '',
            };
        case 'GENERATE_OTP_TOKEN_FAILURE':
            return {
                ...state,
                loading: false,
                successMessage: '',
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default otpReducer;
