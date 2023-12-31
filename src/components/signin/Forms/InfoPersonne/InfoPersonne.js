import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../../../containers/FormContainer";
import * as yup from "yup";

function InfoPersonne() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    operateur: yup.string().required("Ce champ est obligatoire."),
    address: yup.string().required("Ce champ est obligatoire."),
    tel: yup.string().required("Ce champ est obligatoire."),
    password: yup.string().required("Ce champ est obligatoire."),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Le mot de passe doit être identique.") // Validate against the 'password' field
    .required("Ce champ est obligatoire."),
    email: yup.string().email("email invalide.").required("Ce champ est obligatoire."),
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
        password: "", 
        confirmPassword: "",
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
        <div className="flex flex-row mb-2">
          <div className="flex flex-col mr-2">
            <label className="font-medium text-gray-900">Email</label>
            <Field
              type="email"
              name="email"
              className="rounded-md border-2 p-2"
              placeholder="Email"
            />
            <ErrorMessage name="email" render={renderError} />
          </div>

          <div className="flex flex-col ml-2">
            <label className="font-medium text-gray-900">Opérateur</label>
            <Field
              name="operateur"
              className="rounded-md border-2 p-2"
              placeholder="Opérateur"
            />
            <ErrorMessage name="operateur" render={renderError} />
          </div>
        </div>

        <div className="flex flex-row mb-2">
          <div className="flex flex-col mr-2">          
            <label className="font-medium text-gray-900">Address</label>
            <Field
              name="address"
              className="rounded-md border-2 p-2"
              placeholder="Address"
            />
            <ErrorMessage name="address" render={renderError} />
          </div>

          <div className="flex flex-col mr-2">          
            <label className="font-medium text-gray-900">Téléphone</label>
            <Field
              name="tel"
              className="rounded-md border-2 p-2"
              placeholder="Téléphone"
            />
            <ErrorMessage name="tel" render={renderError} />
          </div>
        </div>

        {isPhysique ? (
          // Render the physique form elements here if "type" is "physique"
          <>
            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-2">  
                <label className="font-medium text-gray-900">Nom</label>
                <Field
                  name="nom"
                  className="rounded-md border-2 p-2"
                  placeholder="Nom"
                />
                <ErrorMessage name="nom" render={renderError} />
              </div>

                <div className="flex flex-col mr-2">  
                  <label className="font-medium text-gray-900">Prénom</label>
                  <Field
                    name="prenom"
                    className="rounded-md border-2 p-2"
                    placeholder="Prénom"
                  />
                  <ErrorMessage name="prenom" render={renderError} />
                </div>
              </div>  

              <div className="flex flex-row mb-2">
                <div className="flex flex-col items-start mb-2">
                  <label className="font-medium text-gray-900">Password</label>
                  <Field
                    name="password"
                    className="rounded-md border-2 p-2"
                    placeholder="Password"
                    type="password"
                  />
                  <ErrorMessage name="password" render={renderError} />
                </div>
                <div className="flex flex-col items-start mb-2">
                  <label className="font-medium text-gray-900">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password" 
                    className="rounded-md border-2 p-2"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" render={renderError} />
                </div>
              </div>

            <div className="flex flex-col mr-2">  
              <label className="font-medium text-gray-900">CIN</label>
              <Field
                name="cin"
                className="rounded-md border-2 p-2"
                placeholder="CIN"
              />
              <ErrorMessage name="cin" render={renderError} />
            </div>

            <div className="flex items-center">
              <div className="flex flex-row mb-2">
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
          </div>
          </>
        ) : (
          // Render the morale form elements here if "type" is "morale"
          <>
            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-2">  
                <label className="font-medium text-gray-900">Raison Sociale</label>
                <Field
                  name="raisonSociale"
                  className="rounded-md border-2 p-2"
                  placeholder="Raison Sociale"
                />
                <ErrorMessage name="raisonSociale" render={renderError} />
              </div>

              <div className="flex flex-col mr-2">  
                <label className="font-medium text-gray-900">Register number</label>
                <Field
                  name="registerNumber"
                  className="rounded-md border-2 p-2"
                  placeholder="Register number"
                />
                <ErrorMessage name="registerNumber" render={renderError} />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="flex flex-col items-start mb-2">
                <label className="font-medium text-gray-900">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="rounded-md border-2 p-2"
                  placeholder="Password"
                />
                <ErrorMessage name="password" render={renderError} />
              </div>
              
              <div className="flex flex-col items-start mb-2">
                <label className="font-medium text-gray-900">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password" 
                  className="rounded-md border-2 p-2"
                  placeholder="Confirm Password"
                />
                <ErrorMessage name="confirmPassword" render={renderError} />
              </div>
            </div>

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
