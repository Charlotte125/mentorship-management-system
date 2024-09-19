import React, { useState } from "react";
import "../../src/assets/css/main/main.css";
import { useNavigate } from "react-router-dom";
import Head from "../componet/head"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      const userType = user.userType;

      if (userType === "therapist") {
        navigate("/dashboard");
      } else if (userType === "student") {
        navigate("/chat");
      } else {
        navigate("/notfound"); 
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login">
         <Head/>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
        <a href="/resetpassword">Forgot password?</a>
        <div className="link">
          <p>Don't have an account?</p>
          <a href="/registerpage">Sign up.</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
