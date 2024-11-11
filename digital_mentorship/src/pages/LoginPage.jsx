import React, { useState } from "react";
import "../styles/main/main.css";
import { API_URL } from "../api";

const LoginPage = () => {
  const [student_id, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    if (!student_id || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}registrations/${student_id}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await   
   response.json();
      console.log("Response data:", data);   
  
  
      // ... handle login success or failure based on data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            placeholder="Identification number"
            value={student_id}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <div className="lower-text">
          <a href="/reset-password">Forgot password?</a>
          <div className="link">
            <p>Don't have an account?</p>
            <a href="/sign-up">Sign up.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
