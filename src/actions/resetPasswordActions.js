import config from "../config";

export const resetPassword = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(config.apiURI + "/api/v1/register/client/motdepasseoublie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
    });

    if (response.ok) {
      console.log("Password reset successful!");
    } else {
      console.log("Password reset failed!");
    }
  } catch (error) {
    console.error("Error while resetting password:", error);
  }
};
