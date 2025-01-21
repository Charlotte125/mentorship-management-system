import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { API_URL } from "../../src/api";
import "../styles/main/main.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    student_id: "",
    department: "",
    email_address: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post(`${API_URL}api/register/`, formData);
      if (response.status === 201) {
        setPopupMessage("Registration successful");
        setPopupType("success");
        toast.success("Registration successful!");

        localStorage.setItem(
          "user",
          JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
          })
        );

        setShowPopup(true);
        setTimeout(() => {
          navigate("/choice");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 400) {
          setPopupMessage("Invalid input. Please check your details.");
          toast.error("Invalid input. Please check your details.");
        } else if (error.response.status === 409) {
          setPopupMessage(
            "Email already registered. Please use another email."
          );
          toast.error("Email already registered.");
        } else {
          setPopupMessage("An unexpected error occurred. Please try again.");
          toast.error("An unexpected error occurred.");
        }
      } else if (error.request) {
        // Request was made but no response received
        setPopupMessage(
          "No response from server. Check your network connection."
        );
        toast.error("No response from server.");
      } else {
        // Something else happened
        setPopupMessage("An error occurred. Please try again.");
        toast.error("An error occurred.");
      }
      setPopupType("error");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={formData.student_id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email_address"
            placeholder="Email"
            value={formData.email_address}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div className="lower-text">
          <div className="link">
            <p>Have an account?</p>
            <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
