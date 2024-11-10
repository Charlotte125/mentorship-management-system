import React, { useState } from "react";
import "../styles/main/main.css";
import "../styles/dashboard/dashboard.css";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import line from "../../src/img/line.svg";
import image from "../../src/img/image.svg";
import Sidebar from "../components/Sidebar";
import profile from "../../src/img/profile.svg";
import tick from "../../src/img/tick.svg";
import monitor from "../../src/img/monitor.svg";
import Table from "../components/Table";
import logo from "../../src/img/logo.svg";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="therapist_dashboard">
      <div className="dashboard">
        <div className="side_bar">
          <div className="logo_image">
            <img src={logo} alt="logo"></img>
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
          <div className="header">
            <div className="header_text">
              <h2>Users |</h2>
              <span>1,893</span>
              <h3>Users</h3>
            </div>
            <div className="profile">
              <div className="profile_text">
                <p>Iliza charlotte</p>
                <span>My settings</span>
              </div>
              <div className="image">
                <img src={image} alt="" />
              </div>
            </div>
          </div>

          <div className="lower_section">
            <div className="row_1">
              <div className="circle_1">
                <img src={profile} alt="" />
              </div>
              <div className="circle_text">
                <p>Total therapist</p>
                <span>12</span>
              </div>
            </div>
            <p>|</p>
            <div className="row_1">
              <div className="circle_1">
                <img src={tick} alt="" />
              </div>
              <div className="circle_text">
                <p>Total users</p>
                <span>1,890</span>
              </div>
            </div>
            <p>|</p>
            <div className="row_1">
              <div className="circle_1">
                <img src={monitor} alt="" />
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
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
