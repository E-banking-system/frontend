import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import FormContainer from "./containers/FormContainer";
import Login from "./components/login";
import HomeBackoffice from "./dashboards/backoffice/homeBackoffice";
import HomeClient from "./dashboards/client/homeClient";

function App() {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<FormContainer />} />
          <Route path="/" element={<Login />} />
          {accessToken ? (
            <>
              <Route path="/banquier" element={<HomeBackoffice />} />
              <Route path="/client" element={<HomeClient />} />
            </>
          ) : (
            <Navigate to="/" replace />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
