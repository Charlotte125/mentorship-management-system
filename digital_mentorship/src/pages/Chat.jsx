// Chat.jsx

import React, { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../src/img/logo.svg";
import "../styles/chat/chat.css";
import { useNavigate } from "react-router-dom";

// Chat Component
const Chat = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    </div>
  );
};

// ChatRoom Component
const ChatRoom = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Connect to the WebSocket server when the component mounts
  React.useEffect(() => {
    const socketUrl = `ws://localhost:8000/ws/chat/${roomName}/`;
    const ws = new WebSocket(socketUrl);
    setSocket(ws);

    // Handle receiving messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => ws.close();
  }, [roomName]);

  // Send message to the WebSocket server
  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(JSON.stringify({ message: inputMessage }));
      setInputMessage('');
    }
  };

  return (
    <div className="chat-room-container">
      <h2>Room: {roomName}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
