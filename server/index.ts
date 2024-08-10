import express, { Request, Response } from 'express'
import cors from 'cors'
import { Server, Socket } from 'socket.io';
import http from 'http';

const app = express();
const PORT = 4000;
const server = http.createServer();

app.use(cors())

const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

interface User {
  socketID: string;
  name: string;
}

let users: User[] = [];

socketIO.on('connection', (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected`);

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data)
  })
  
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data))

  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  })

  socket.on('disconnect', () => {
    console.log(`🔥: A user disconnected`);

    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users)
    socket.disconnect();
  })
})

app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: "Hello world",
  })
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})