import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://localhost:8200/api/v1/auth/authenticate", values);
      console.log("Response:", response.data.role);
        
      // Handle successful authentication
      alert("Welcome to "+response.data.role+" dashbord!");
  
      // You may handle storing the access_token or redirect the user to another page here.
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert("Email and password are not valid.");
        } else if (err.response.status === 403) {
          alert("User must validate their account by verifying their email.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  const renderError = (message) => <p className="text-danger">{message}</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-row mb-2">
                  <div className="flex flex-col mr-2">
                    <label className="font-medium text-gray-900">Email</label>
                    <Field type="email" name="email" className="rounded-md border-2 p-2" placeholder="Email" />
                    <ErrorMessage name="email" render={renderError} />
                  </div>
                  <div className="flex flex-col mr-2">
                    <label className="font-medium text-gray-900">Password</label>
                    <Field type="password" name="password" className="rounded-md border-2 p-2" placeholder="Password" />
                    <ErrorMessage name="password" render={renderError} />
                  </div>
                </div>
                <ErrorMessage name="general" render={renderError} />
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
