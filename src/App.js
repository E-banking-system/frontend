import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FormContainer from "./containers/FormContainer";
import Login from "./components/login";
import HomeBackoffice from "./dashboards/backoffice/homeBackoffice";
import HomeClient from "./dashboards/client/homeClient";
import ForgetPassword from "./components/forgetPassword/forgetPassword";

function App() {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  const role = localStorage.getItem('role');
  console.log(role);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<FormContainer />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/banquier" element={ <HomeBackoffice/> }
          />
          <Route
            path="/client" element= { <HomeClient /> }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;