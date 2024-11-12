import React, { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import logo from "../../src/img/logo.svg";
import "../styles/chat/chat.css";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import image from "../../src/img/image.svg";
import { BsThreeDotsVertical } from "react-icons/bs";

// Data arrays
const sender = [
  { text: "Hi, I’m feeling really overwhelmed with schoolwork lately. I don’t know how to manage it all.", time: "2024-11-12 09:00:00" },
  { text: "Hi there! I’m sorry to hear you’re feeling this way. Can you tell me more about what’s been stressing you out the most?", time: "2024-11-12 12:30:00" },
];

const reply = [
  { reply: "I understand! It’s tough to juggle everything. Have you tried breaking it down into smaller tasks?", time: "2024-11-12 09:15:00" },
  { reply: "Maybe you could set a schedule for yourself to make things more manageable. What do you think?", time: "2024-11-12 12:45:00" },
];

// Dummy data
const dummyData = [
  {
    first_name: "Thierry",
    last_name: "Rugamba",
    random_text: "Things have been tense. My parents and I are not getting along, and it’s been really stressful.",
    icon: <CiStar />,
    date: "2024-11-12",
    time: "14:30",
    image: image,
  },
  {
    first_name: "Gloria",
    last_name: "Keza",
    random_text: "Honestly, not very good. I’ve been feeling really down about myself and my abilities.",
    icon: <CiStar />,
    date: "2024-11-11",
    time: "09:15",
    image: image,
  },
  {
    first_name: "Patrick",
    last_name: "Nyirinkindi",
    random_text: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
    icon: <CiStar />,
    date: "2024-11-10",
    time: "17:45",
    image: image,
  },
  {
    first_name: "Aline",
    last_name: "Uwera",
    random_text: "Not great. I feel like I’m drifting apart from my friends, and I’m not sure why.",
    icon: <CiStar />,
    date: "2024-11-09",
    time: "12:00",
    image: image,
  },
  {
    first_name: "Ishimwe",
    last_name: "Uwera",
    random_text: "Not great. I feel like I’m drifting apart from my friends, and I’m not sure why.",
    icon: <CiStar />,
    date: "2024-11-09",
    time: "12:00",
    image: image,
  },
];

const Chat = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (index === 0) {
      navigate("/dashboard");
    } else if (index === 1) {
      navigate("/chat-room");
    } else if (index === 2) {
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = dummyData.filter((item) =>
    `${item.first_name} ${item.last_name} ${item.random_text}`
      .toLowerCase()
      .includes(searchTerm)
  );

  return (
    <div className="chat-room">
      <div className="side_bar">
        <div className="logo_image">
          <img src={logo} alt="logo" />
          <p>Digital Mentorship</p>
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
      <div className="column">
        <div className="row">
          <div className="rows">
            <div className="row_1">
              <h2>Messages</h2>
              <p>|</p>
            </div>
            <div className="row_2">
              <span>6</span>
              <p>New messages</p>
            </div>
          </div>
          <div className="search_container">
            <div className="input-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
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
        <div className="room">
          <div className="col_1">
            <div className="messages">
              <h2>All messages</h2>
              <BsThreeDotsVertical />
            </div>
            {filteredData.map((item, index) => (
              <div key={index} className="chat-card">
                <div className="chat-card-header">
                  <div className="img_text">
                    <img src={item.image} className="chat-card-image" />
                    <div className="chat-card-info">
                      <div className="icon_names">
                        <h3>
                          {item.first_name} {item.last_name}
                        </h3>
                        <div className="chat-card-icon">{item.icon}</div>
                      </div>
                      <p>{item.random_text}</p>
                      <h5>
                        {item.date} at {item.time}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col_2">
            <div className="header">
              <div className="header_img_text">
                <img src={image} alt="image" />
                <p>Gloria Keza</p>
              </div>
              <div className="header_icons">
                <CiStar id="star" />
                <FiSearch id="search" />
                <BsThreeDotsVertical id="dots" />
              </div>
            </div>
            {/* Messages container */}
            <div className="messages">
              <p>Today | 6:30pm</p>
              <div className="text">
                {/* Display sender messages */}
                <div className="sender">
                  {sender.map((item, index) => (
                    <div className="text_time" key={index}>
                      <p id="sender_message">{item.text} </p>
                      <p > {item.time}</p>
                    </div>
                  ))}
                </div>
                {/* Display reply messages */}
                <div className="reply">
                  {reply.map((item, index) => (
                    <div className="text_time" key={index}>
                      <p>{item.reply} | {item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
