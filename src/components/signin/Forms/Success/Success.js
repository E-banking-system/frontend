// Success.js
import React, { useContext } from "react";
import { FormContext } from "../../../../App";

function Success() {
  const { formData } = useContext(FormContext);

  // Display the user's filled information in the console
  console.log("User's Filled Information:", formData);

  return (
    <div className="font-medium">
      Informations bien reçues:
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default Success;
