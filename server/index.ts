import express, {Request, Response} from 'express'
import cors from 'cors'

const app = express();
const PORT = 4000;

const http = require('http').Server(app);

app.use(cors())

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

app.get('/api', (req:Request, res:Response) => {
    res.json({
        message: "Hello world",
    })
});

http.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})