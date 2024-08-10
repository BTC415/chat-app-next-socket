'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface ChatBarProps {
  socket: typeof Socket
}

interface User {
  socketID: string,
  userName: string
}

const ChatBar: React.FC<ChatBarProps> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([])
  // const usersRef = useRef<User[]>(users)

  // useEffect(() => {
  //   const handleUserResponse = (data: User[]) => {
  //     setUsers(data)
  //   }
  //   socket.on('newUserResponse', handleUserResponse)

  //   return () => {
  //     socket.off('newUserResponse', handleUserResponse);
  //   };
  // }, [socket])

  // useEffect(() => {
  //   usersRef.current = users;
  // }, [users]);

  useEffect(() => {
    socket.on('newUserResponse', (data: User[]) => setUsers(data))
  }, [socket, users])

  return (
    <div className="max-w-md hidden md:block h-full bg-[#f9f5eb] flex-1 p-5 border-r border-[#fdfdfd]">
      <h2 className='justify-center font-bold text-2xl my-10'>Open Chat</h2>

      <div>
        <h4 className="font-sans font-semibold text-red-500 my-7.5">ACTIVE USERS</h4>
        <div className="mb-2.5 text-[#607eaa] text-sm">
          {users.map((user) => (
            <p key={user.socketID}>
              {user.userName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;