import React from "react";
import "../styles/main/main.css";
import "../styles/dashboard/dashboard.css";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import line from "../../src/img/line.svg";
import image from "../../src/img/image.svg";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="side-bar">
        <div className="sidebar-contents">
          <div className="icons">
            <div className="icon-text">
              <FaCalendarAlt />
              <p>Dashboard</p>
            </div>
            <div className="icon-text">
              <RiMessage2Line />
              <p>Messages</p>
            </div>
            <div className="icon-text">
              <IoIosLogOut />
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row-1">
          <div className="text-line">
            <h1>Therapist</h1>
            <img src={line} alt="line"></img>
            <p>
              {" "}
              <span>1,8934</span> users{" "}
            </p>
          </div>
          <div className="img-text">
            <div className="text">
              <p>Iliza charlotte</p>
              <p>My settings</p>
            </div>
            <div className="img">
              <img src={image} alt="profile pic"></img>
            </div>
          </div>
        </div>
        <div className="row-2">
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
