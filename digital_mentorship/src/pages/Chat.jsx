import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { serverTimestamp, addDoc } from 'firebase/firestore';

// Firebase initialization
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCEJAXnWjjtWiqsGGdZx0nnEU5FOCkJNm8",
  authDomain: "digital-mentorship-system.firebaseapp.com",
  projectId: "digital-mentorship-system",
  storageBucket: "digital-mentorship-system.appspot.com",
  messagingSenderId: "601769013167",
  appId: "1:601769013167:web:2984b1003a33bf348c495a",
  measurementId: "G-WC522CVRER"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

const Chat = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="chat-room">
      <section>
        {user ? <ChatRoom /> : <Signup />} {/* Conditional rendering for sign-in */}
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
  console.log(messages); // Debug here to see if the messages are being retrieved
  

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
        createdAt: serverTimestamp() // Ensure this field is added
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
