import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { setAccessToken, setUserRole } from "../../actions/loginActions";
import { useState } from "react";
import CustomAlert from "../CustomAlert";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);


  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        config.apiURI + "/api/v1/auth/authenticate",
        values
      );

      dispatch(setAccessToken(response.data.access_token));
      dispatch(setUserRole(response.data.role));

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "BANQUIER") {
        navigate("/banquier");
      } else if (response.data.role === "CLIENT") {
        navigate("/client");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setIsOpen(true); // Show the custom alert modal
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setIsOpen(false); 
  };

  const renderError = (message) => <p className="text-danger">{message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bienvenu!
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" render={renderError} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" render={renderError} />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </button>
                </div>

                <div className="text-sm text-center">
                  <Link
                    to="/register"
                    className="font-medium text-gray-600 hover:text-gray-400"
                  >
                    Register
                  </Link>
                  <span className="mx-2">|</span>
                  <Link
                    to="/forgetPassword"
                    className="font-medium text-gray-600 hover:text-gray-400"
                  >
                    Forget Password
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          <CustomAlert
            isOpen={isOpen}
            onClose={handleAlertClose}
            title="Alert"
            message="vous devez aller à votre banque pour poursuivre les étapes d'authentification"
            actionLabel="OK"
          />

        </div>
      </div>
    </div>
  );
};

export default Login;
