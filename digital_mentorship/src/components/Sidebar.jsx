import React from 'react'
import "../styles/main/main.css";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import "../styles/sidebar/sidebar.css"

const sidebar = () => {
  return (
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
  )
}

export default sidebar