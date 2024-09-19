import React from 'react'

const ForgotpasswordPage = () => {
  return (
   <div className="forgot-password">
    <h2>Reset Password</h2>
    <form>
        <input type="text" placeholder="Email address"></input>
        <input type="password" placeholder="New password"></input>
        <input type="passowrd" placeholder="Confirm password"></input>
        <button type="button">Reset</button>
    </form>
   </div>
  )
}

export default ForgotpasswordPage