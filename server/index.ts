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

socketIO.on('connection', (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log(`🔥: A user disconnected`)
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