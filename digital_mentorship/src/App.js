import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/loginpage";
import GoToTop from "./componet/GoToTop";
import Registerpage from "./pages/registerpage";
import Resetpassword from "./pages/resetpassword";
import Dashboard from "./pages/dashboard";
import Welcome from "./pages/welcome";
import Conditions from "./pages/conditions";
import Chat from "./pages/chat";
import Notfound from "./pages/notfound";

function Main() {
  return (
    <BrowserRouter>
      <GoToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/therapist-conditions" element={<Conditions />} />
        <Route path="/therapist-loginpage" element={<Loginpage />} />
        <Route path="/student-loginpage" element={<Loginpage />} />
        <Route path="/registerPage" element={<Registerpage />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Chat" element = {<Chat/>}/>
        <Route path="/notfound" element = {<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
;
