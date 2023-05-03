import express from 'express'
import {userRouter} from './users/userRouter'
import {config} from 'dotenv'
import cors from 'cors';
import { startConnection } from "./database"
const app = express()
const http = require('http')
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*",}
});

config({path: '/.env'})

const PORT = process.env.PORT;
const URL_MONGO = process.env.URL_MONGO!;

const database = "tictactoe"

startConnection(URL_MONGO,database)

//cors
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors(options));

app.use(express.json())
app.use('/users',userRouter)

io.on('connection', (socket:any) => {
  console.log("conected",socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected',socket.id);
  });
  socket.on('user_id', (msg:string) => {
    console.log('user_id: ' + msg);
  });

})

server.listen(PORT,()=>{
    console.log("Server listen on port 3001")
})