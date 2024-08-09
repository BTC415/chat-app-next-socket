'use client'
import { useEffect } from 'react';  
import socketIO, { Socket } from 'socket.io-client';  
import styles from "./page.module.css";  

const socket: typeof Socket = socketIO.connect('http://localhost:4000');  

export default function Home() {  
  useEffect(() => {  
    // Example use of the socket  
    socket.on('connect', () => {  
      console.log('Connected to server');  
    });  

    return () => {  
      socket.disconnect();  
    };  
  }, []);  

  return (  
    <div>  
      <p>Hello World!</p>  
    </div>  
  );  
}
