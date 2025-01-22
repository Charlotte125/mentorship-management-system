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
import { getLoggedInUser, getUserCount } from "../api";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    setUser(loggedInUser);

    getUserCount().then((count) => setUserCount(count));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Mimicking loading
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

  const [counts, setCounts] = useState({
    therapists: 0,
    total_users: 0,
    active_students: 0,
    university_staff: 0,
  });

  useEffect(() => {
    console.log("Counts state updated:", counts);
  }, [counts]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/count/users/");
        const data = await response.json();
        setCounts({
          therapists: data.therapists,
          total_users: data.total_users,
          active_students: data.active_students,
          university_staff: data.university_staff,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="therapist_dashboard">
      <div className="dashboard">
        {/* Sidebar always visible */}
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

        {/* Content Area with Skeleton Effect */}
        <div className="therapist_contents">
          {isLoading ? (
            <>
              {/* Skeleton Loader for Content */}
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
                  <Skeleton width="70px" height="70px" borderRadius="50%" />
                  <div className="circle_text">
                    <Skeleton width="80px" height="20px" />
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <Skeleton width="70px" height="70px" borderRadius="50%" />
                  <div className="circle_text">
                    <Skeleton width="80px" height="20px" />
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <Skeleton width="70px" height="70px" borderRadius="50%" />
                  <div className="circle_text">
                    <Skeleton width="80px" height="20px" />
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <Skeleton width="70px" height="70px" borderRadius="50%" />
                  <div className="circle_text">
                    <Skeleton width="80px" height="20px" />
                  </div>
                </div>
              </div>

              <div className="table_section">
                <Skeleton width="100%" height="300px" />
              </div>
            </>
          ) : (
            <>
              {/* Actual Content */}
              <div className="header">
                <div className="header_text">
                  <h2>Users |</h2>
                  <span>{userCount}</span>
                  <h3>Users</h3>
                </div>
                <div className="profile">
                  <div className="profile_text">
                    <p>{user ? user.name : "Loading..."}</p>
                    <span>My settings</span>
                  </div>
                  <div className="image">
                    <img src={user ? user.image : ""} alt="Profile" />
                  </div>
                </div>
              </div>

              <div className="lower_section">
                <div className="row_1">
                  <div className="circle_1">
                    <img src={profile} alt="Profile Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Total Therapists</p>
                    <span>{counts.therapists}</span>
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={tick} alt="Tick Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Total Users</p>
                    <span>{counts.total_users.toLocaleString()}</span>
                  </div>
                </div>
                <p>|</p>
                <div className="row_1">
                  <div className="circle_1">
                    <img src={monitor} alt="Monitor Icon" />
                  </div>
                  <div className="circle_text">
                    <p>Active Students</p>
                    <span>{counts.active_students}</span>
                  </div>
                </div>
                <p>|</p>

                <div className="row_1">
                  <div className="circle_1">
                    <img src={monitor} alt="Monitor Icon" />
                  </div>
                  <div className="circle_text">
                    <p>University staff</p>
                    <span>{counts.university_staff}</span>
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
