import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../../App";
import config from '../../../../config';

const apiURI = config.apiURI;

function Success() {
  const { formData } = useContext(FormContext);
  
  const client = formData.type;

  useEffect(() => {
    // Function to make the API call
    const callAPI = async () => {
      try {
        const apiUrl = apiURI + "/api/v1/register/client/" + client;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };
    
        const response = await fetch(apiUrl, requestOptions);
    
        // Check if the response status indicates success (2xx)
        if (response.ok) {
          const data = await response.json();
          // Handle the JSON response
          console.log("API Response:", data);
        } else {
          // Handle non-JSON responses (e.g., error responses)
          console.error("API Error:", response.statusText);
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("API Error:", error);
      }
    };
    
    // Call the API function
    callAPI();
  }, [client, formData]);

  return (
    <div className="font-medium">
      Informations bien reçues:
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default Success;
