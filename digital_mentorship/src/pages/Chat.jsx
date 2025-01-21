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
import axios from "axios";

const Chat = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messageCounts, setMessageCounts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/messages/");

      console.log("Fetched message counts:", response.data.message_counts);
      setMessages(response.data.messages);
      setMessageCounts(response.data.message_counts);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

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
      setMessages((prevMessages) => [data, ...prevMessages]);
      setMessageCounts((prevCounts) => {
        const newCounts = prevCounts.map((count) => {
          if (count.first_name === data.first_name) {
            return { ...count, message_count: count.message_count + 1 };
          }
          return count;
        });
        return newCounts;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat");

    newSocket.onopen = () => {
      console.log("WebSocket is open now.");
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);

      setMessages((prevMessages) => [receivedMessage, ...prevMessages]);

      // Update the message counts after receiving a new message
      setMessageCounts((prevCounts) => {
        const newCounts = prevCounts.map((count) => {
          if (count.id === receivedMessage.userId) {
            return { ...count, message_count: count.message_count + 1 };
          }
          return count;
        });
        return newCounts;
      });
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

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

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const filteredData = dummyData.filter((item) =>
    `${item.first_name} ${item.last_name} ${item.random_text}`
      .toLowerCase()
      .includes(searchTerm)
  );

  const getTotalMessageCount = () => {
    return messageCounts.reduce((sum, item) => sum + item.message_count, 0);
  };

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
              <span>{getTotalMessageCount()}</span>
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
              <p>
                {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
              </p>
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

            {messages && messages.length > 0 ? (
              messages.map((item, index) => (
                <div key={index} className="chat-card">
                  <div className="chat-card-header">
                    <div className="img_text">
                      <img
                        src={`https://ui-avatars.com/api/?name=${item.first_name}`}
                        className="chat-card-image"
                        alt="profile"
                      />
                      <div className="chat-card-info">
                        <h3>{item.first_name}</h3>
                        <p>{item.message}</p>
                        <h5>{new Date(item.timestamp).toLocaleString()}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages available</p>
            )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
