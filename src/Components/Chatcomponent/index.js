import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = ({ user }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = io('https://app.jobbooks.app');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('RECEIVE_MESSAGE', function(data) {
      setChat([...chat, data]);
    });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    // Send message to the server
    socket.emit('SEND_MESSAGE', {
        chatId:"65fa18c7ebad3b348503f316",
        senderId:"65b3d1fe9c10c930b1e15abf",
        receiverId:"65a6c5a9531a93895155b433",
        content:"g kon ?"
    });
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {chat.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;
