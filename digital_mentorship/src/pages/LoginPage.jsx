import React from "react";
import "../styles/main/main.css";


const LoginPage = () => {
  return (
    <div className="container">
      <div className="contents">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email address"></input>
          <input type="text" placeholder="Registration number"></input>
          <input type="password" placeholder="password"></input>
          <button type="button">Login </button>
        </form>
        <div className="lower-text">
          <p> Forgot Password ?</p>
          <p>
            Don't have an account ? <span>Sign up Now</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
