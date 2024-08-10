import React, { useState, FormEvent, use } from 'react';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: typeof Socket
}

const ChatFooter: React.FC<ChatFooterProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handleTyping = () => {
    const userName = localStorage.getItem('userName')
    socket.emit('typing', `${userName} is typing`)
  }

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;