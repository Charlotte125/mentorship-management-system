import React, { useState, useEffect } from "react";
import "../styles/main/main.css";
import "../styles/dashboard/dashboard.css";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../../src/img/logo.svg";
import image from "../../src/img/image.svg";
import profile from "../../src/img/profile.svg";
import tick from "../../src/img/tick.svg";
import monitor from "../../src/img/monitor.svg";
import Table from "../components/Table";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  
  const handleItemClick = (index) => {
    setActiveIndex(index);

    if (index === 0) {
      navigate("/dashboard");
    } else if (index === 1) {
      navigate("/chat-room");
    } else if (index === 2) {
      setShowLogoutPopup(true);
    }
  };

  const handleLogout = () => {
    setShowLogoutPopup(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setShowLogoutPopup(false);
  };

  return (
    <section className="therapist_dashboard">
      <div className="dashboard">
        <div className="side_bar">
          <div className="logo_image">
            <img src={logo} alt="logo" />
            <p>Digital mentorship</p>
          </div>
          <div
            className={`icon_text ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleItemClick(0)}
          >
            <FaCalendarDays />
            <p>Dashboard</p>
          </div>
          <div
            className={`icon_text ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleItemClick(1)}
          >
            <FaRegMessage />
            <p>Messages</p>
          </div>
          <div
            className={`icon_text ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => handleItemClick(2)}
          >
            <IoLogOutOutline />
            <p>Log out</p>
          </div>
        </div>

        <div className="therapist_contents">
          {isLoading ? (
            <>
        
              <div className="header">
                <div className="header_text">
                  <Skeleton width="150px" height="30px" />
                  <Skeleton width="100px" height="20px" />
                </div>
                <div className="profile">
                  <Skeleton width="150px" height="20px" />
                  <Skeleton width="40px" height="40px" borderRadius="50%" />
                </div>
              </div>

            
              <div className="lower_section">
                <div className="row_1">
                  <div className="circle_1">
                    <img src={profile} alt="Profile Icon" />
                  </div>
                  <div className="circle_text">
                    <Skeleton width="100px" height="20px" />
                    <Skeleton width="40px" height="20px" />
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={tick} alt="Tick Icon" />
                  </div>
                  <div className="circle_text">
                    <Skeleton width="100px" height="20px" />
                    <Skeleton width="40px" height="20px" />
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={monitor} alt="Monitor Icon" />
                  </div>
                  <div className="circle_text">
                    <Skeleton width="100px" height="20px" />
                    <Skeleton width="40px" height="20px" />
                  </div>
                </div>
              </div>

      
              <div className="table_section">
                <Skeleton width="100%" height="300px" />
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <div className="header_text">
                  <h2>Users |</h2>
                  <span>1,893</span>
                  <h3>Users</h3>
                </div>
                <div className="profile">
                  <div className="profile_text">
                    <p>Iliza Charlotte</p>
                    <span>My settings</span>
                  </div>
                  <div className="image">
                    <img src={image} alt="Profile" />
                  </div>
                </div>
              </div>

              <div className="lower_section">
                <div className="row_1">
                  <div className="circle_1">
                    <img src={profile} alt="Profile Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Total therapists</p>
                    <span>12</span>
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={tick} alt="Tick Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Total users</p>
                    <span>1,890</span>
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={monitor} alt="Monitor Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Active Now</p>
                    <span>189</span>
                  </div>
                </div>
              </div>

              <div className="table_section">
                <Table />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
