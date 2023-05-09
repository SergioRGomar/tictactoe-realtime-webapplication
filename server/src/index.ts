type typeObjGame = {
  board: Array<any>,
  player_1:object,
  player_2:object,
  turn:string,
  status:string,
  date:object,
  movements:number,
  winner:object,
  result:string
}

import cors from 'cors';
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";

import { startdbConnection, updateUserStatus, getUsersToPair, createNewGameRoom, updateGameStatus, getGameStatus, updateGame, saveVictory, saveDefeat, saveDraw } from "./database"
import { userRouter } from './users/userRouter'

const app = express()
const server = createServer(app)

import { config } from 'dotenv';
config();

const PORT = 3001
const URL_MONGO = "mongodb+srv://sergiorgomar:GbMm5L3jI0X1HBMs@clustersergioservidor.nrl8vir.mongodb.net/?retryWrites=true&w=majority"

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = { origin: allowedOrigins }

app.use(cors(options));
app.use(express.json())
app.use('/users',userRouter)


const database = "tictactoe"
startdbConnection(URL_MONGO,database).then(()=>{
 
  server.listen(PORT,()=>{
    console.log("Server listen on port 3001")
    
    let pairingProcess:Function = () => {}
    const io = new Server(server, {  cors: { origin: "*",}})

    io.on('connection', (socket) => {
      
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

      //user decline a game
      socket.on("declineGame",(objGame,userData)=>{
        updateUserStatus(userData._id,socket.id,"online")
          .then(()=>{
            if(objGame.player_1._id === userData._id)
              socket.to(objGame.player_2.socket_id).emit("gameDeclinedByEnemy")
            else
              socket.to(objGame.player_1.socket_id).emit("gameDeclinedByEnemy")
            
            updateGameStatus(objGame._id,"rejected")
          })
      })

      socket.on("acceptGame",(objGame,userData)=>{
        if(objGame.player_1._id === userData._id)
          socket.to(objGame.player_2.socket_id).emit("gameAcceptedByEnemy")
        else
          socket.to(objGame.player_1.socket_id).emit("gameAcceptedByEnemy")
        
        getGameStatus(objGame._id)
          .then((status)=>{
            if(status !== "half-accepted")
              updateGameStatus(objGame._id,"half-accepted")
            else{
              updateGameStatus(objGame._id,"playing")
              updateUserStatus(objGame.player_1._id, objGame.player_1.socket_id, "playing")
              updateUserStatus(objGame.player_2._id, objGame.player_2.socket_id, "playing")

              io.to(objGame.player_1.socket_id).to(objGame.player_2.socket_id).emit("startGame")
            }
          })
        })

        socket.on("newPlayerMovement",(newGameState)=>{
          updateGame(newGameState)
            .then(()=>{
              io.to(newGameState.player_1.socket_id ).to(newGameState.player_2.socket_id).emit("updateGame",newGameState)
            })
        })

        socket.on("playerWin",(player)=> saveVictory(player))

        socket.on("playeDefeat",(player)=> saveDefeat(player))

        socket.on("playersDraw",(player_1,player_2)=>{
          saveDraw(player_1)
          saveDraw(player_2)
        })


    })
    
    //Function to notify users of a new game and send object with the init game
    pairingProcess = async (users: { socket_id: string | string[]; }[])=>{
      const random = Math.floor(Math.random() * 2 )
      const objGame:typeObjGame = {
        board:[null,null,null,null,null,null,null,null,null],
        turn:"O",
        player_1:users[0+random],
        player_2:users[1-random],
        status:"created",
        movements:0,
        winner:null!,
        result:"",
        date: new Date()
      }
      createNewGameRoom(objGame)
        .then((currentGame)=>{
          io.to(users[0].socket_id).to(users[1].socket_id).emit("initGame",currentGame)
        })
     
    }
    
    //Algorithm of pairing 
    const pairingIntelligence = ()=>{
      getUsersToPair().then((response)=>{
        if(response.error){
          //emit error, no players availaible to play
          console.log(response.error)
        }else{
          pairingProcess(response.usersToPair)
        }
        setTimeout(pairingIntelligence,3000)
      })
    }
    pairingIntelligence()
    
  })

})

