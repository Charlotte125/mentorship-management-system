import React, { useState, useEffect } from "react";
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
import { GoSmiley } from "react-icons/go";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { AiOutlineLike } from "react-icons/ai";
import { io } from "socket.io-client";

const Messages = [
  {
    text1:
      "Hi, I’m feeling really overwhelmed with schoolwork lately. I don’t know how to manage it all.",
    time1: "2024-11-12 09:00:00",
    reply1:
      "Hi there! I’m sorry to hear you’re feeling this way. Can you tell me more about what’s been stressing you out the most?",
    time2: "2024-11-12 12:30:00",
  },
  {
    text2:
      "Hi there! I’m sorry to hear you’re feeling this way. Can you tell me more about what’s been stressing you out the most?",
    time3: "2024-11-12 12:45:00",

    reply2:
      "Maybe you could set a schedule for yourself to make things more manageable. What do you think?",
    time4: "2024-11-12 09:15:00",
  },
];

const dummyData = [
  {
    first_name: "Thierry",
    last_name: "Rugamba",
    random_text:
      "Things have been tense. My parents and I are not getting along, and it’s been really stressful.",
    icon: <CiStar />,
    date: "2024-11-12",
    time: "14:30",
    image: image,
  },
  {
    first_name: "Gloria",
    last_name: "Keza",
    random_text:
      "Honestly, not very good. I’ve been feeling really down about myself and my abilities.",
    icon: <CiStar />,
    date: "2024-11-11",
    time: "09:15",
    image: image,
  },
  {
    first_name: "Patrick",
    last_name: "Nyirinkindi",
    random_text:
      "Hey! Did you finish the Hi-FI wireframes for flora app design?",
    icon: <CiStar />,
    date: "2024-11-10",
    time: "17:45",
    image: image,
  },
  {
    first_name: "Aline",
    last_name: "Uwera",
    random_text:
      "Not great. I feel like I’m drifting apart from my friends, and I’m not sure why.",
    icon: <CiStar />,
    date: "2024-11-09",
    time: "12:00",
    image: image,
  },
  {
    first_name: "Ishimwe",
    last_name: "Uwera",
    random_text:
      "Not great. I feel like I’m drifting apart from my friends, and I’m not sure why.",
    icon: <CiStar />,
    date: "2024-11-09",
    time: "12:00",
    image: image,
  },
];

const Chat = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [activeMessageType, setActiveMessageType] = useState("All messages");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const messageContainer = document.querySelector(".text");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendText = () => {
    if (inputValue.trim()) {
      const newMessage = {
        sender: "user",
        message: inputValue,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("message", (data) => {
      console.log("Message from server:", data);
      setReceivedMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io("http://localhost:3000");
    socket.emit("clientMessage", message);
    setMessage("");
  };

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

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat");

    newSocket.onopen = () => {
      console.log("WebSocket is open now.");
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError(`WebSocket error: ${error.message}`);
    };

    newSocket.onclose = () => {
      console.error("WebSocket connection closed. Retrying...");
      setError("WebSocket connection closed unexpectedly. Reconnecting...");
      setTimeout(() => {
        setSocket(new WebSocket("ws://127.0.0.1:8000/ws/chat"));
      }, 5000); // Retry in 5 seconds
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() && socket) {
      const message = {
        message_type: "All messages",
        message: inputValue,
        sender: "user",
      };

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        setMessages((prevMessages) => [...prevMessages, message]);
        setInputValue("");
      } else {
        console.error(
          "WebSocket is not open. Current state:",
          socket.readyState
        );
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
            <div className="inbox-messages">
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
            <div className="sender_receiver">
              <p>Today | 6:30pm</p>
              <div className="text">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user" ? "user-message" : "client-message"
                    }
                  >
                    <div className="message-bubble">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="typing">
                <div className="space">
                  <GoSmiley />
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendText();
                      }
                    }}
                  />

                  <button onClick={handleSendText}>Send Text</button>
                  <div className="text_icons">
                    <HiOutlineMicrophone />
                    <AiOutlineLike />
                  </div>
                </div>
              </div>
              <div className="message">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user"
                        ? "user-message hidden"
                        : msg.message_type === "clients"
                        ? "client-message hidden"
                        : "employee-message hidden"
                    }
                  >
                    <p>
                      <strong>
                        {msg.message_type === "clients" ? "Client" : "Employee"}
                        :
                      </strong>{" "}
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
