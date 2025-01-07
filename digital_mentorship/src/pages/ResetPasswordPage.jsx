import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../styles/main/main.css";
import "../styles/welcomePage/welcome.css";

const ResetPasswordPage = ({ match }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = match.params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/reset-password/${token}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password: newPassword }),
      }
    );

    const result = await response.json();
    if (result.success) {
      alert("Password reset successful!");
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
