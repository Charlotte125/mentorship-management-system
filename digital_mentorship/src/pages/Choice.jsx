import React from "react";
import "../styles/main/main.css";
import "../styles/welcomePage/welcome.css";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Choice = () => {
  return (
    <div className="container">
      <div className="welcome-page">
        <h2>Who do you want to start a conversation with?</h2>
        
        <Link to="/chat-room" className="icon-container therapist-icon"> 
          <div className="therapist">
            <h3>Therapist</h3>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </Link>

        <Link to="/chat-room" className="icon-container staff-icon"> 
          <div className="staff">
            <h3>Lecturer/University staff</h3>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Choice;
