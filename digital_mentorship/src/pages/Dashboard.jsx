import React from "react";
import "../styles/main/main.css";
import "../styles/dashboard/dashboard.css";
import line from "../../src/img/line.svg";
import image from "../../src/img/image.svg";
import Sidebar from "../components/Sidebar";
import profile from "../../src/img/profile.svg";
import tick from "../../src/img/tick.svg";
import monitor from "../../src/img/monitor.svg";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="col">
        <div className="row">
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
         <div className="lower-section">
         <div className="row-2">
            <div className="col">
              <img src={profile} alt=""></img>
              <div className="img-num">
              <p>Total therapist</p>
              <p>12</p>
              </div>
            </div>
            <div className="col">
              <img src={tick} alt=""></img>
              <div className="img-num">
              <p>Users</p>
              <p>1,893</p>
              </div>
            </div>
            <div className="col">
              <img src={profile} alt=""></img>
              <div className="img-num">
              <p>Active now</p>
              <p>189</p>
              </div>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
