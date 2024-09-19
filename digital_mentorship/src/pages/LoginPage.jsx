import React from "react";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email address"></input>
        <input type="text" placeholder="Registration number"></input>
        <input type="password" placeholder="password"></input>
        <button type="button">Login </button>
      </form>
      <p> Forgot Password ?</p>
      <p>Don't have an account ? <span>Sign Up</span> </p>
    </div>
  );
};

export default LoginPage;
