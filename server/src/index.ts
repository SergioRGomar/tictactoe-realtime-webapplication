import cors from 'cors';
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";


//User dependences
import { startdbConnection, updateUserStatus, getUsersToPair} from "./database"
import {userRouter} from './users/userRouter'
const app = express();
const server = createServer(app);

const io = new Server(server, {  cors: { origin: "*",}});

import {config} from 'dotenv';

//init a enviromental variables
config();
//const PORT = process.env.PORT;
//const URL_MONGO = process.env.URL_MONGO;

const database = "tictactoe"

//cors
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json())
app.use('/users',userRouter)

let pairingProcess:Function = ()=>{}

startdbConnection(URL_MONGO,database).then(()=>{
 
  server.listen(PORT,()=>{
    console.log("Server listen on port 3001")
    
    //esto se ejecuta por cada soquet 
    io.on('connection', (socket:any) => {
      
      socket.on('disconnect', () => {
        updateUserStatus("",socket.id,"offline")
          .then((response)=>{
            console.log(response.message)
        })
      });

      socket.on("newUserOnline", (user_id:string) => {
        updateUserStatus(user_id,socket.id,"online")
          .then((response)=>{
            console.log(response.message)
        })
      });

      socket.on("searchingGame",(user_id:string)=>{
        updateUserStatus(user_id,socket.id,"searchingGame")
          .then((response)=>{
            console.log(response.message)
          })
      })

      pairingProcess = (users:Array<any>)=>{
        console.log(users)
       // socket.emit("initGame",users)
      }

    })

    const pairingInteligence = ()=>{
      getUsersToPair().then((response:any)=>{
        if(response.error){
          console.log(response.error)
        }else{
          //call to pairing process to make emits to users.
          pairingProcess(response.usersToPair)
        }
        setTimeout(pairingInteligence,500)
      })
    }
    pairingInteligence()

  })

})

