'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';

const socket: typeof Socket = io.connect('http://localhost:4000');

const Home: React.FC = () => {
  const router = useRouter()

  const [userName, setUserName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('newUser', { userName, socketID: socket.id })
    if (userName) {
      setError('')
      router.push('/chat')
    } else {
      setError('Please input userName')
    }
  }

  return (
    <div>
      <form className='w-full h-screen flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <h2 className="mb-7.5">Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          minLength={6}
          name="username"
          id="username"
          className="p-2.5 w-1/2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="w-48 p-2.5 text-base cursor-pointer bg-[#607eaa] text-[#f9f5eb] outline-none border-none rounded">SIGN IN</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home