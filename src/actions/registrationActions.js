import config from "../config";

const apiURI = config.apiURI;

export const setFormData = (formData) => ({
  type: "SET_FORM_DATA",
  payload: formData,
});

export const submitFormData = (formData) => async (dispatch) => {
  try {
    const client = formData.type;
    const apiUrl = apiURI + "/api/v1/register/client/" + client;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    dispatch({ type: "SUBMIT_FORM_REQUEST" });
   
    const response = await fetch(apiUrl, requestOptions);

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "SUBMIT_FORM_SUCCESS", payload: data });
      console.info("registration form is submited successfully");
    } else {
      console.warn("API Error:", response.statusText);
      dispatch({ type: "SUBMIT_FORM_ERROR", payload: response.statusText });
    }
  } catch (error) {
    console.warn("API Error:", error);
    dispatch({ type: "SUBMIT_FORM_ERROR", payload: error.message });
  }
};
