import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../../containers/FormContainer";
import config from '../../../../config';
import { Link } from 'react-router-dom';

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
      Informations bien reçu. Vérifier votre email pour poursuivre votre inscription puis vous pouvez s'inscrire.
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">
          s'inscrire
        </Link>
      </div>
    </div>
  );
}

export default Success;
