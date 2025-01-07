import React, { useState } from "react";
import "../styles/main/main.css";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";  

const LoginPage = () => {
  const [student_id, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);  

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!student_id || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/registrations/${student_id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id, password }), // Send both the student_id and password
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Invalid credentials.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.student_id) {
        setUserData(data);
        setSuccessMessage("Login successful! Redirecting...");

        // Store login session in sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userData", JSON.stringify(data));

        // Redirect to the Choice page
        setTimeout(() => {
          navigate("/Choice");
        }, 1000);
      } else {
        setError("Invalid credentials or registration not found.");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Incorrect password or an error occurred.");
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

        {userData && (
          <div className="user-info">
            <h3>Welcome, {userData.first_name} {userData.last_name}</h3>
            <p>Email: {userData.email_address}</p>
            <p>Department: {userData.department}</p>
            <p>Student ID: {userData.student_id}</p>
          </div>
        )}

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
