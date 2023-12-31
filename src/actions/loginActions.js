export const setAccessToken = (accessToken) => {
    return {
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    };
  };
  
  export const setUserRole = (role) => {
    return {
      type: "SET_USER_ROLE",
      payload: role,
    };
  };

  export const setUserId = (user_id) => {
    return {
      type: "SET_USER_ID",
      payload: user_id,
    };
  };
  