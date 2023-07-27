// import { createContext, useState } from "react";
// import Step from "./components/signin/Step"
// import Stepper from "./components/signin/Stepper";
// // import Login from "./components/login";
// export const FormContext = createContext();

// function App() {
//   const [activeStepIndex, setActiveStepIndex] = useState(0);
//   const [formData, setFormData] = useState({});

//   return (
//     <FormContext.Provider
//       value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
//     >
//       <div className="w-screen h-screen flex flex-col items-center justify-start">
//         <Stepper />
//         <Step />
//         {/* <Login /> */}
//       </div>
//     </FormContext.Provider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import FormContainer from "./containers/FormContainer";
import Login from "./components/login";


function App() {

  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Form</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={FormContainer} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
