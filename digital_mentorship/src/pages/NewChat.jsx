import React from "react";
import "../styles/new/chat.css";

const NewChat = () => {
  return (
    <div className="col-2">
      {/* Header */}
      <div className="header">
        <img src="https://via.placeholder.com/40" alt="User" />
        <div className="info">
          <h3>John Doe</h3>
          <p>Online</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="chat">{/* No messages initially */}</div>

      {/* Input area */}
      <div className="input-area">
        <input type="text" placeholder="Type a message" />
        <button>▶</button>
      </div>
    </div>
  );
};

export default NewChat;
