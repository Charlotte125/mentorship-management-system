import React, { useState } from "react";
import "../styles/main/main.css";

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
      const response = await fetch(`registration/${student_id}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response status:", response.status); 
      console.log("Response text:", await response.text()); 
  
      if (response.status === 200) {
        const data = await response.json();
        console.log("Response data:", data);
  
        if (data.password === password) {  
          setError(""); 
          setSuccessMessage("Login successful!");
        } else {
          setSuccessMessage(""); 
          setError("Incorrect password. Please try again.");
        }
      } else if (response.status === 404) {
        setSuccessMessage("");
        setError("User not found. Please check your ID.");
      } else {
        setSuccessMessage(""); 
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Fetch error:", error); 
      setSuccessMessage(""); 
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
