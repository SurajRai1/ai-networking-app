import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Firebase configuration
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

const Chat = ({ matchId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const messagesRef = collection(db, 'chats', matchId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [db, matchId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'chats', matchId, 'messages'), {
        text: newMessage,
        senderId: auth.currentUser.uid,
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === auth.currentUser.uid ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
