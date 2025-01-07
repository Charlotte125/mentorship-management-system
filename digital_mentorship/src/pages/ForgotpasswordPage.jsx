import React, { useState } from "react";
import "../styles/main/main.css";

const ForgotpasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/send-reset-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Password reset email sent!");
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset</button>
        </form>
        <div className="lower-text">
          <div className="link">
            <p>Have an account?</p>
            <a href="/">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotpasswordPage;
