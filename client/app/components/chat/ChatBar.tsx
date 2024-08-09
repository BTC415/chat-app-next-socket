'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface ChatBarProps {
  socket: typeof Socket
}

const ChatBar: React.FC<ChatBarProps> = ({ socket }) => {
  const [users, setUsers] = useState<any[]>([])
  const usersRef = useRef(users)

  useEffect(() => {
    usersRef.current = users;
    const handleUserResponse = (data: any) => {
      setUsers(data)
    }
    if (socket) {
      socket.on('newUserResponse', handleUserResponse)
    }
    return () => {
      if (socket) {
        socket.off('newUserResponse', handleUserResponse);
      }
    };
  }, [socket])

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;