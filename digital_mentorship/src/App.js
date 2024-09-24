import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import ForgotpasswordPage from "./pages/ForgotpasswordPage";
import Dashboard from "./pages/Dashboard";
import TherapistLoginPage from "./pages/therapist/TherapistLoginPage";
import Conditions from "./pages/therapist/Conditions";
import TherapistSignupPage from "./pages/therapist/TherapistSignupPage";
function Main() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<WelcomePage />} />   
        <Route path="/login" element={<Loginpage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/reset-password" element={<ForgotpasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/therapist_login" element={<TherapistLoginPage />} />
        <Route path="/therapist_signup" element={<TherapistSignupPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Main;
;
