import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, 'chats');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.values(data);
        setMessages(messagesArray);
      }
    });
  }, [db]);

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const messagesRef = ref(db, 'chats');
      push(messagesRef, {
        sender: 'You',
        content: newMessage,
        timestamp: Date.now(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
            <p><strong>{message.sender}:</strong> {message.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
