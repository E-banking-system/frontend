import React, { createContext, useState } from "react";
import Step from "../components/signin/Step";
import Stepper from "../components/signin/Stepper";

export const FormContext = createContext();


function FormContainer() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});
    

    return (
        <FormContext.Provider
            value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
        >
            <div className="w-screen h-screen flex flex-col items-center justify-start">
            <Stepper />
            <Step />
            </div>
        </FormContext.Provider>
    );
}

export default FormContainer;
