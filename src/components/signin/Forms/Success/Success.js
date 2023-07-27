import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../../App";
import config from '../../../../config';

const apiURI = config.apiURI;

function Success() {
  const { formData } = useContext(FormContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formDataWithoutConfirmPassword = { ...formData };
  delete formDataWithoutConfirmPassword.confirmPassword;
  
  const client = formDataWithoutConfirmPassword.type;

  useEffect(() => {
    const callAPI = async () => {
      try {
        const apiUrl = apiURI + "/api/v1/register/client/" + client;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithoutConfirmPassword),
        };
    
        const response = await fetch(apiUrl, requestOptions);
    
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);
        } else {
          console.error("API Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    
    callAPI();
  }, [client, formDataWithoutConfirmPassword]);

  return (
    <div className="font-medium">
      Informations bien reçues:
      <pre>{JSON.stringify(formDataWithoutConfirmPassword, null, 2)}</pre>
    </div>
  );
}

export default Success;
