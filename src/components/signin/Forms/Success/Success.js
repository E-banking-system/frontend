import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setFormData } from "../../../../actions/registrationActions";
import { submitFormData } from "../../../../actions/registrationActions";

function Success() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.formData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formDataWithoutConfirmPassword = { ...formData };
  delete formDataWithoutConfirmPassword.confirmPassword;

  useEffect(() => {
    dispatch(setFormData(formDataWithoutConfirmPassword));
    dispatch(submitFormData(formDataWithoutConfirmPassword));
  }, [formDataWithoutConfirmPassword, dispatch]);

  const apiStatus = useSelector((state) => state.registration.apiStatus);

  return (
    <div className="font-medium">
      {apiStatus === "success" ? (
        <div>
          Informations bien reçu. Vérifier votre email pour poursuivre votre inscription puis vous pouvez vous inscrire.
          <div className="mt-4">
            <Link to="/" className="text-blue-500 underline">
              s'inscrire
            </Link>
          </div>
        </div>
      ) : apiStatus === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div>Error occurred while processing the request.</div>
      )}
    </div>
  );
}

export default Success;
