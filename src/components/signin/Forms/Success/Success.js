import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setFormData } from "../../../../actions/registrationActions";
import { submitFormData } from "../../../../actions/registrationActions";
import { FormContext } from "../../../../containers/FormContainer";

function Success() {
  const dispatch = useDispatch();
  const { formData } = useContext(FormContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formDataWithoutConfirmPassword = { ...formData };
  delete formDataWithoutConfirmPassword.confirmPassword;

  useEffect(() => {
    dispatch(setFormData(formDataWithoutConfirmPassword));
    dispatch(submitFormData(formDataWithoutConfirmPassword));
  }, [formDataWithoutConfirmPassword, dispatch]);

  
  return (
    <div className="font-medium">
      <div>
          Informations bien reçu. Vérifier votre email pour poursuivre votre inscription puis vous pouvez vous inscrire.
          <div className="mt-4">
            <Link to="/" className="text-blue-500 underline">
              s'inscrire
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Success;
