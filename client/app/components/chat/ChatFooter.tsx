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

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`)


  return (
    <div className="p-2.5 bg-[#f9f5eb] h-[10vh]">
      <form className="mx-auto w-full h-full flex items-center justify-between" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="w-10/12 rounded-lg border border-[#ddd] outline-none p-3.5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="px-6 bg-green-600 p-2.5 border-none outline-none text-[#eae3d2] cursor-pointer hover:bg-[rgb(129,201,129)] rounded-md">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;