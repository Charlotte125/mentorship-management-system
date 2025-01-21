import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/main/main.css";
import api, { API_URL } from "../../api";

const TherapistLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const navigate = useNavigate();

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleLogin = async () => {
    const formData = {
      email_address: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API_URL}api/login/`, formData);

      console.log("Login successful:", response.data);

      setPopupMessage("Login successful!");
      setPopupType("success");
      setShowPopup(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      setPopupMessage(
        error.response?.data?.non_field_errors?.[0] || "An error occurred."
      );
      setPopupType("error");
      setShowPopup(true);

      setErrorMessage(
        error.response?.data?.non_field_errors?.[0] || "An error occurred."
      );
    }
  };

  return (
    <div className="container">
      <div className="popups">
        {showPopup && (
          <div className={`popup ${popupType}`}>
            <span className="close-icon" onClick={closePopup}>
              ×
            </span>
            <p>{popupMessage}</p>
          </div>
        )}
      </div>
      <div className="contents">
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="lower-text">
          <p>Forgot Password?</p>
          <p>
            Don't have an account? <span>Sign up Now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapistLoginPage;
