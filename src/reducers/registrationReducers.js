const initialState = {
    formData: {},
    apiStatus: "idle", // or "loading", "success", "error"
    error: null,
  };
  
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_FORM_DATA":
        return {
          ...state,
          formData: action.payload,
        };
      case "SUBMIT_FORM_REQUEST":
        return {
          ...state,
          apiStatus: "loading",
          error: null,
        };
      case "SUBMIT_FORM_SUCCESS":
        return {
          ...state,
          apiStatus: "success",
          error: null,
        };
      case "SUBMIT_FORM_ERROR":
        return {
          ...state,
          apiStatus: "error",
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default registrationReducer;
  