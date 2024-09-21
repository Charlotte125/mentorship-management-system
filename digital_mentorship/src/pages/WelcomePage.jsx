import React from "react";
import "../styles/main/main.css";
import "../styles/welcomePage/welcome.css";
import { FaChevronRight } from "react-icons/fa";

const WelcomePage = () => {
  return (
    <div className="container">
      <div className="welcome-page">
        <h2>Welcome to Digital mentorship program</h2>
        <div className="therapist-icon">
          <div className="therapist">
            <h3>Therapist</h3>
            <p> Login in as a therapist</p>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="staff-icon">
          <div className="staff">
            <h3>University staff</h3>
            <p> Login in as a univerity staff</p>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="student-icon">
          <div className="student">
            <h3>Student</h3>
            <p> Login in as a univerity student</p>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
