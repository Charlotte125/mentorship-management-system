import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main/main.css";
import "../styles/welcomePage/welcome.css";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="welcome-page">
        <h2>Welcome to Digital Mentorship Program</h2>

        <Link to="/therapist_signup" className="icon-container therapist-icon">
          {" "}
          {/* Link for Therapist */}
          <div className="therapist">
            <h3>Therapist</h3>
            <p>Login in as a therapist</p>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </Link>

        <Link to="/staff" className="icon-container staff-icon">
          <div className="staff">
            <h3>University Staff</h3>
            <p>Login in as a university staff</p>
          </div>
          <div className="right-icon">
            <div className="icon">
              <FaChevronRight />
            </div>
          </div>
        </Link>

        <Link to="/sign-up" className="icon-container student-icon">
          <div className="student">
            <h3>Student</h3>
            <p>Login in as a university student</p>
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

export default WelcomePage;
