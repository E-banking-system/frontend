import React, { useContext } from "react";
import { FormContext } from "../../../App";
import { TypePersonne, Success, InfoPersonne } from "../Forms";

function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <TypePersonne />;
      break;
    case 1:
      stepContent = <InfoPersonne />;
      break;
    case 2:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
