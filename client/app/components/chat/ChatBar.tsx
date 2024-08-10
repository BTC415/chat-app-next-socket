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
    <div className=" h-full bg-[#f9f5eb] flex-1 p-5 border-r border-[#fdfdfd]">
      <h2>Open Chat</h2>

      <div>
        <h4 className="my-7.5">ACTIVE USERS</h4>
        <div className="mb-2.5 text-[#607eaa] text-sm">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;