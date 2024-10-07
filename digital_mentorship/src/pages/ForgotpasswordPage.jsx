import React from 'react'
import "../styles/main/main.css"

const ForgotpasswordPage = () => {
  return (
  <div className="container">
     <div className="contents">
    <h2>Reset Password</h2>
    <form>
        <input type="text" placeholder="Email address"></input>
        <input type="password" placeholder="New password"></input>
        <input type="passowrd" placeholder="Confirm password"></input>
        <button type="button">Reset</button>
    </form>
    <div className="lower-text">
      <div className="link">
          <p>Have an accoount?</p>
          <a href="/">signin </a>
        </div>
    </div>
   </div>
  </div>
  )
}

export default ForgotpasswordPage