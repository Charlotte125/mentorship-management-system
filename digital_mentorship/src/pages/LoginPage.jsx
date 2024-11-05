import React, { useState } from "react";
import "../styles/main/main.css";


const LoginPage = () => {
  const [student_id, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Check if fields are empty
    if (!student_id || !password) {
      setError("Both fields are required.");
      return;
    }
    
    try {
      // Example of making a login API call
      const response = await fetch(`/registration/${student_id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        // Handle successful login
        setError(""); // Clear any existing errors
        // Redirect or other logic here
      } else {
        // Handle errors
        setError("Login failed. Check your credentials.");
      }
    } catch (error) {
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
          <button type="button" onClick={handleLogin}>Login</button>
          {error && <p className="error-message">{error}</p>}
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
