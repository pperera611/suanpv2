import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard";
import SignInSide from './components/SignInSide';
import Logout from './components/Logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout.js";


function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <AuthLayout>
                  {" "}
                  <Dashboard />{" "}
                </AuthLayout>
              }
            />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<SignInSide />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
