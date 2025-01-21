import React, { useState } from "react";
import api, { API_URL } from "../../../src/api";
import "../../styles/main/main.css";
import { useNavigate } from "react-router-dom";

const UniversityStaffLoginPage = () => {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [staffData, setStaffData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email_address || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/university-staff-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Invalid credentials.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.staff_id) {
        setStaffData(data);
        setSuccessMessage("Login successful! Redirecting...");

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("staffData", JSON.stringify(data));

        setTimeout(() => {
          navigate("/dashboard");
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
        {staffData && (
          <div className="user-info">
            <h3>
              Welcome, {staffData.first_name} {staffData.last_name}
            </h3>
          </div>
        )}
        <h2>University Staff Login</h2>
        <form>
          <input
            type="text"
            placeholder="Email address"
            value={email_address}
            onChange={(e) => setEmailAddress(e.target.value)}
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
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>

        <div className="lower-text">
          <a href="/reset-password">Forgot password?</a>
          <div className="link">
            <p>Don't have an account?</p>
            <a href="/staff">Sign up.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityStaffLoginPage;
