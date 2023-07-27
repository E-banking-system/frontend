import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FormContainer from "./containers/FormContainer";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={
              <FormContainer />
          } />
          <Route path="/" element={
              <Login />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

