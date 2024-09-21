import React from 'react'
import "../styles/main/main.css"



const SignupPage = () => {
  return (
  <div className="container">
      <div className="contents">
        <form>
            <h2>Register</h2>
            <input type="text" placeholder="First name"></input>
            <input type="text" placeholder="Last name"></input>
            <input type="number" placeholder="Registration number"></input>
            <input type="text" placeholder="Department"></input>
            <input type="email" placeholder="email"></input>
            <input type="Password" placeholder="Password"></input>
            <button type="button">Sign up</button>
        </form>
       <div className="lower-text">
       <p>Have an account ?  <span>Sign in </span>  </p>
       </div>
    </div>
  </div>
  )
}

export default SignupPage