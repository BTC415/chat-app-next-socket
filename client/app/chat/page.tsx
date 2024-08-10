'use client'
import React, { useState, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client';
import ChatBar from '../components/chat/ChatBar'
import ChatBody from '../components/chat/ChatBody'
import ChatFooter from '../components/chat/ChatFooter'


const socket: typeof Socket = io.connect('http://localhost:4000');

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [typingStatus, setTypingStatus] = useState<string>('')
  const messagesRef = useRef(messages);
  const lastMessageRef = useRef(null);


  useEffect(() => {
    messagesRef.current = messages; // Keep the ref updated  

    const handleMessageResponse = (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    // Check if socket is defined before attaching listener  
    if (socket) {
      socket.on('messageResponse', handleMessageResponse);
    }

    // Cleanup on unmount or when socket changes  
    return () => {
      if (socket) {
        socket.off('messageResponse', handleMessageResponse);
      }
    };
  }, [socket]); // Only run this effect when socket changes  

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='w-full h-screen flex items-center'>
      <ChatBar socket={socket} />
      <div className='h-full flex-4'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}

export default Chat;