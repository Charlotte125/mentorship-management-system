import React from 'react';
import "../../styles/main/main.css";

const TherapistSignupPage = () => {
  return (
    <div className="container">
      <div className="contents">
        <form>
          <h2>Register</h2>
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="number" placeholder="Level of education" />
          <input type="email" placeholder="Email" />
          <input type="Password" placeholder="Password" />
          <div className="field">
              <label htmlFor="extensionLetterCopy">
                Attach copy of your diploma/certificate
                received
              </label>
              <input
                id="file"
                type="file"
              
              />
            </div>

          <button type="button">Sign up</button>
        </form>

        <div className="lower-text">
          <p>
            Have an account? <span>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapistSignupPage;
