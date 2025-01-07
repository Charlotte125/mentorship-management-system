import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Loginpage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import ForgotpasswordPage from "./pages/ForgotpasswordPage";
import Dashboard from "./pages/Dashboard";
import TherapistLoginPage from "./pages/therapist/TherapistLoginPage";
import TherapistSignupPage from "./pages/therapist/TherapistSignupPage";
import Chat from "./pages/Chat";
import Choice from "./pages/Choice";
import ResetPasswordPage from "./pages/ResetPasswordPage";



function Main() {
  return (
    <BrowserRouter>
     
      <Routes>
        
        <Route path="/" element={<WelcomePage />} />   
        <Route path="/login" element={<Loginpage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgotpasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/therapist_login" element={<TherapistLoginPage />} />
        <Route path="/therapist_signup" element={<TherapistSignupPage />} />
        <Route path="/chat-room" element={<Chat />} />
        <Route path="/choice" element={<Choice/>} />
        <Route path="/reset" element={<ResetPasswordPage/>} />
        
      </Routes>
      <div>

      </div>
    </BrowserRouter>
    
  );
}

export default Main;
