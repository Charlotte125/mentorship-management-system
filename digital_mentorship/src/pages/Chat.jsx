import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { serverTimestamp, addDoc } from 'firebase/firestore';
import "../../src/styles/dashboard/dashboard.css";
import "../styles/main/main.css";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../src/img/logo.svg";
import { initializeApp } from 'firebase/app';
import "../styles/chat/chat.css";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCEJAXnWjjtWiqsGGdZx0nnEU5FOCkJNm8",
  authDomain: "digital-mentorship-system.firebaseapp.com",
  projectId: "digital-mentorship-system",
  storageBucket: "digital-mentorship-system.appspot.com",
  messagingSenderId: "601769013167",
  appId: "1:601769013167:web:2984b1003a33bf348c495a",
  measurementId: "G-WC522CVRER"
};


initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

const Chat = () => {
  const [user] = useAuthState(auth);
  const [activeIndex, setActiveIndex] = useState(0);


  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setActiveIndex(index);

    if (index === 0) {
      navigate("/dashboard"); // Navigate to the dashboard page
    } else if (index === 1) {
      navigate("/chat-room"); // Navigate to the chat-room page
    } else if (index === 2) {
      // Add your logout logic here
      navigate("/login");
    }
  };

  return (
    <div className="chat-room">
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
      <section>
        {user ? <ChatRoom /> : <Signup />}
      </section>
    </div>
  );
};

const Signup = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Signed in as:', result.user.displayName);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>
      Sign Out
    </button>
  );
};

const ChatRoom = () => {
  const messagesRef = collection(firestore, 'messages');
  const messageQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  console.log(messages); 
  

  return (
    <div>
      <div className="messages">
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <SignOut />
    </div>
  );
};
const addMessage = async (text, uid) => {
    try {
      await addDoc(collection(firestore, 'messages'), {
        text: text,
        uid: uid,
        createdAt: serverTimestamp() 
      });
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

const ChatMessage = (props) => {
  const { text, uid } = props.message;
  return <p>{text}</p>;
};

export default Chat;
