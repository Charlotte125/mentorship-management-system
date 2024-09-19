import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import ForgotpasswordPage from "./pages/ForgotpasswordPage";


function Main() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<WelcomePage />} />   
        <Route path="/login" element={<Loginpage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/reset-password" element={<ForgotpasswordPage />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
;
