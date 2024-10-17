import React from "react";
import "../styles/main/main.css";


const LoginPage = () => {
  return (
    <div className="container">
      <div className="contents">
        <h2>Login</h2>
        <form>
          
          <input type="text" placeholder="Identification number"></input>
          <input type="password" placeholder="password"></input>
          <button type="button">Login </button>
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
