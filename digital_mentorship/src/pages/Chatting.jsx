import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';

const Chatting = () => {
    const [roomName, setRoomName] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(false);

    const joinRoom = () => {
        if (roomName.trim()) {
            setIsChatVisible(true);
        }
    };

    return (
        <div className="app-container">
            {!isChatVisible ? (
                <div className="room-selection">
                    <h2>Join a Chat Room</h2>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Enter room name..."
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <ChatRoom roomName={roomName} />
            )}
        </div>
    );
};

export default Chatting;
