import React, { useState } from 'react';
import "../../styles/main/main.css";
import Conditions from '../../components/Conditions';

const TherapistSignupPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Set initial state to true or false based on your needs

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container">
      <div className="contents">
        {isPopupOpen && <Conditions closePopup={closePopup} />}
        <form>
          <h2>Register</h2>
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="number" placeholder="Level of education" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="field">
            <label htmlFor="extensionLetterCopy">
              Attach copy of your diploma/certificate received
            </label>
            <input id="file" type="file" />
          </div>
          <button type="button">Sign up</button>
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

export default TherapistSignupPage;
