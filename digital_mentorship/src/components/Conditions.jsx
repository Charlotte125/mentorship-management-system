import React, { useState } from "react";
import "../styles/main/main.css";
import "../styles/popup/conditions.css";

const Conditions = ({ closePopup }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAgree = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      setTimeout(() => closePopup(), 800);
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={closePopup}></div>
      <div className="conditions">
        <button className="close-btn" onClick={closePopup}>
          X
        </button>
        <h3>Terms and Conditions for Online Therapy Services</h3>
        <ul>
          <li>
            As the therapist, you agree to provide online therapy sessions via
            secure platforms (video calls or chat). You are responsible for
            maintaining a professional standard of care throughout the
            consultation.
          </li>
          <li>
            You agree to maintain confidentiality of all client information,
            except when legally required to disclose (e.g., imminent harm to
            self or others). You must use secure methods to store and transmit
            client data.
          </li>
          <li>
            You confirm that you are a licensed therapist in accordance with
            local and international regulations. You agree to comply with any
            laws governing teletherapy services.
          </li>
          <li>
            You acknowledge that while every effort is made to provide
            high-quality care, you may not be held liable for the limitations
            inherent in online therapy or for any consequences arising from a
            client’s actions during or after therapy.
          </li>
          <li>
            You acknowledge that online therapy may not be suitable for clients
            in crisis situations. You must provide clients with alternative
            emergency contact information or refer them to appropriate local
            services.
          </li>
          <li>
            You must obtain informed consent from each client before beginning
            any therapy sessions. Ensure that clients understand the scope,
            limitations, and risks associated with online therapy.
          </li>
          <li>
            These terms may be revised periodically. You agree to stay updated
            on any changes and ensure ongoing compliance with them.
          </li>
        </ul>
        <label>
          <input type="checkbox" onChange={handleAgree} /> I agree to the terms
          and conditions
        </label>
        {isChecked && (
          <p className="confirmation">Thank you for agreeing to the terms.</p>
        )}
      </div>
    </>
  );
};

export default Conditions;
