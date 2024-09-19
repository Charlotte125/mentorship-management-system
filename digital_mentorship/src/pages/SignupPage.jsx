import React from 'react'

const SignupPage = () => {
  return (
    <div className="signup-page">
        <form>
            <h2>Sign up  </h2>
            <input type="text" placeholder="First name"></input>
            <input type="text" placeholder="Last name"></input>
            <input type="number" placeholder="Registration number"></input>
            <input type="text" placeholder="Department"></input>
            <input type="email" placeholder="email"></input>
            <input type="Password" placeholder="Password"></input>
            <button type="button">Sign up</button>
        </form>
        <p>Have an account ?  <span>Sign in </span>  </p>
    </div>
  )
}

export default SignupPage