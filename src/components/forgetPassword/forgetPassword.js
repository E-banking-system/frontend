import { useDispatch } from "react-redux";
import { resetPassword } from "../../actions/resetPasswordActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            alert("l'opération va prendre quelque seconds. Vérifier votre email pour suivre les étapes");
            await dispatch(resetPassword(values.email, values.password));
        } catch (error) {
            console.error("Error while resetting password:", error);
        } finally {
            setSubmitting(false);
        }
    };

  const initialValues = { email: "", password: "" };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const renderError = (message) => <p className="text-danger">{message}</p>;

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <Field type="email" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Email" />
                    <ErrorMessage name="email" render={renderError} />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <Field type="password" name="password" id="password" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Password" />
                    <ErrorMessage name="password" render={renderError} />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isSubmitting}>
                    reset
                  </button>
                </div>

                <div className="text-sm text-center">
                  <Link to="/" className="font-medium text-gray-600 hover:text-gray-400">
                    Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

  );
}

export default ForgetPassword;
