import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../../../App";
import * as yup from "yup";

function InfoPersonne() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    operateur: yup.string().required("This field is required."),
    address: yup.string().required("This field is required."),
    tel: yup.string().required("This field is required."),
    email: yup.string().email("Invalid email address.").required("This field is required."),
  });

  // Check the selected "type" from the previous form
  const isPhysique = formData.type === "physique";

  const handlePreviousClick = () => {
    setActiveStepIndex(activeStepIndex - 1);
  };

  return (
    <Formik
      initialValues={{
        operateur: "",
        address: "",
        tel: "",
        email: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className="flex flex-col justify-center items-center">

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Email</label>
          <Field
            type="email"
            name="email"
            className="rounded-md border-2 p-2"
            placeholder="Email"
          />
        </div>
        <ErrorMessage name="email" render={renderError} />

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Opérateur</label>
          <Field
            name="operateur"
            className="rounded-md border-2 p-2"
            placeholder="Opérateur"
          />
        </div>
        <ErrorMessage name="operateur" render={renderError} />

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Address</label>
          <Field
            name="address"
            className="rounded-md border-2 p-2"
            placeholder="Address"
          />
        </div>
        <ErrorMessage name="address" render={renderError} />

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Téléphone</label>
          <Field
            name="tel"
            className="rounded-md border-2 p-2"
            placeholder="Téléphone"
          />
        </div>
        <ErrorMessage name="tel" render={renderError} />

        {isPhysique ? (
          // Render the physique form elements here if "type" is "physique"
          <>
            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-gray-900">Nom</label>
              <Field
                name="nom"
                className="rounded-md border-2 p-2"
                placeholder="Nom"
              />
            </div>
            <ErrorMessage name="nom" render={renderError} />

            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-gray-900">Prénom</label>
              <Field
                name="prenom"
                className="rounded-md border-2 p-2"
                placeholder="Prénom"
              />
            </div>
            <ErrorMessage name="prenom" render={renderError} />

            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-gray-900">CIN</label>
              <Field
                name="cin"
                className="rounded-md border-2 p-2"
                placeholder="CIN"
              />
            </div>
            <ErrorMessage name="cin" render={renderError} />

            <div className="flex items-center">
              <label className="font-medium text-gray-900 mr-14">
                <Field
                  name="gender"
                  className="form-radio text-indigo-600"
                  type="radio"
                  value="FEMALE"
                />
                <span className="ml-2">FEMALE</span>
              </label>

              <label className="font-medium text-gray-900">
                <Field
                  name="gender"
                  className="form-radio text-indigo-600"
                  type="radio"
                  value="MALE"
                />
                <span className="ml-2">MALE</span>
              </label>
            </div>
            <ErrorMessage name="gender" render={renderError} />

          </>
        ) : (
          // Render the morale form elements here if "type" is "morale"
          <>
            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-gray-900">Raison Sociale</label>
              <Field
                name="raisonSociale"
                className="rounded-md border-2 p-2"
                placeholder="Raison Sociale"
              />
            </div>
            <ErrorMessage name="raisonSociale" render={renderError} />

            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-gray-900">Register number</label>
              <Field
                name="registerNumber"
                className="rounded-md border-2 p-2"
                placeholder="Register number"
              />
            </div>
            <ErrorMessage name="registerNumber" render={renderError} />
          </>
        )}

        <div className="w-2/3 flex flex-row items-center justify-center px-32 py-4 space-x-64">
        <button
          className="stepper-item text-center font-medium border-2 rounded-full rounded-md bg-stone-300 font-medium text-black my-2 p-2"
          onClick={handlePreviousClick}
        >
          Précédent
        </button>

        <button
          className="text-center font-medium border-2 rounded-full rounded-md bg-orange-400 font-medium text-white my-2 p-2"
          type="submit"
        >
          Suivant
        </button>
        </div>

      </Form>
    </Formik>
  );
}

export default InfoPersonne;
