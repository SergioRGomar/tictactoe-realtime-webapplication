import cors from 'cors';
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";

import { startdbConnection, updateUserStatus, getUsersToPair} from "./database"
import { userRouter } from './users/userRouter'

const app = express()
const server = createServer(app)

import { config } from 'dotenv';
config();
//const PORT = process.env.PORT;
//const URL_MONGO = process.env.URL_MONGO;

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = { origin: allowedOrigins }

app.use(cors(options));
app.use(express.json())
app.use('/users',userRouter)

const database = "tictactoe"
startdbConnection(URL_MONGO,database).then(()=>{
 
  server.listen(PORT,()=>{
    console.log("Server listen on port 3001")
    
    let pairingProcess:Function = ()=>{}
    const io = new Server(server, {  cors: { origin: "*",}})

    io.on('connection', (socket:any) => {
      
      //user is disconnected
      socket.on('disconnect', () => {
        updateUserStatus("",socket.id,"offline")
          .then((response)=>{
            console.log(response.message)
        })
      });

      //user is login
      socket.on("newUserOnline", (user_id:string) => {
        updateUserStatus(user_id,socket.id,"online")
          .then((response)=>{
            console.log(response.message)
        })
      });

      //user is ready to play
      socket.on("searchGame",(user_id:string)=>{
        updateUserStatus(user_id,socket.id,"searchingGame")
          .then((response)=>{
            console.log(response.message)
          })
      })
      
    })
    
    //Function to notify users of a new game and send object with the init game
    pairingProcess = async (users:any)=>{
      const objGame = {
        board:[null,null,null,null,null,null,null,null],
        turn:false,
        player:false,
        //enemy:user
      }

      io.to(users[0].socket_id).to(users[1].socket_id).emit("initGame",`GAME FINDEND`)
    }

    //Algorithm of pairing 
    const pairingIntelligence = ()=>{
      getUsersToPair().then((response:any)=>{
        if(response.error){
          console.log(response.error)
        }else{
          pairingProcess(response.usersToPair)
        }
        setTimeout(pairingIntelligence,1000)
      })
    }
    pairingIntelligence()
    
  })

})

