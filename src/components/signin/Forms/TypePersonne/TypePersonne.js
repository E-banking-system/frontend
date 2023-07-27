import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../../../containers/FormContainer";
import * as yup from "yup";

function TypePersonne() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    type: yup.string().required("Please select a type."),
  });

  return (
    <Formik
      initialValues={{
        type: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className="flex flex-col justify-center items-center">
        <div className="text-2xl font-medium self-center mb-2">Bienvenue</div>

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Vous êtes personne:</label>
          <div className="flex items-center">
            <label className="mr-4">
              <Field type="radio" name="type" value="physique" className="form-radio text-indigo-600" />
              <span className="ml-2">Physique</span>
            </label>

            <label>
              <Field type="radio" name="type" value="morale" className="form-radio text-indigo-600" />
              <span className="ml-2">Morale</span>
            </label>
          </div>
        </div>
        <ErrorMessage name="type" render={renderError} />

        <button
          className="rounded-md bg-orange-400 font-medium text-white my-2 p-2"
          type="submit"
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
}

export default TypePersonne;
