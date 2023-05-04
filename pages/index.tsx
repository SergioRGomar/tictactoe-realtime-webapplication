

import React from "react"
import { useEffect, useState } from "react"
import { io } from 'socket.io-client'

import Board from "../components/Board"
import ModalConfirmGame from "../components/ModalConfirmGame"
import ModalLoader from "../components/ModalLoader"

import { getCookie } from "../general/generalfunctions"
import { getUser } from "../general/httprequest"
import { calculateWinner } from "@/general/game"

import '@/styles/modal.module.css'

const socket = io('http://localhost:3001')

type objUserData = {
  _id:string,
  email:string,
  victories:number,
  defeats:number, 
  draws:number,
  total_games:number,
  status:string
}

type objGame = {
  _id:string,
  board:Array<string>,
  player_1:object,
  player_2:object, 
  turn:string,
  status:string,
  date:object,
  movements:number,
  winner:object,
  result:string
}


const initUserData:objUserData = {
  _id:"",
  email:"",
  victories:0,
  defeats:0, 
  draws:0,
  total_games:0,
  status:""
}

const initGameData:objGame = {
  _id:"",
  board:[],
  player_1:{},
  player_2:{}, 
  turn:"",
  status:"",
  date:{},
  movements:0,
  winner:{},
  result:""
}

export default function Home(){

    const [currentPlayerIcon, setCurrentPlayerIcon] = useState("")
    const [userData,setUserData] = useState(initUserData)
    const [gameState,setGameState] = useState(initGameData)

    const [enemyStatusText, setEnemyStatusText] = useState("Waiting for your opponent's response..")

    const [showModalAceptGame, setShowModalAceptGame] = useState(false)
    const [showModalBottons, setShowModalBottons] = useState("")
    const [showBoardGame, setShowBoardGame] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      const user_id = getCookie('user_id_tictactoe')
      if(!user_id){
          window.location.href = "login"
      }else{
        getUser(user_id).then((response)=>{
          setUserData(response.user)
          socket.emit('newUserOnline', response.user._id)
        })
      }
              
    }, []);


    //If paring is find a game
    socket.on("startGame",()=>{
      setShowModalAceptGame(false)
      setShowBoardGame(true)
      //change game status to "playing in mongodb"
    })

    //if the pairing is susseful 
    socket.on("initGame",(objGame)=>{
      setIsLoading(false)
      setGameState(objGame)
      console.log(objGame)
      if(objGame.player_1._id === getCookie('user_id_tictactoe')){
        setCurrentPlayerIcon("O")
      }else{
        setCurrentPlayerIcon("X")
      }
      setShowModalAceptGame(true)
    })

    socket.on("updateGame",(objGame)=>{
      setGameState(objGame)
      //
    })

    //detect a click on a cell
    function handleCellClick(cellNumber:number) {
      if(gameState.status === "finished"){
          return
      }
      const newGameState = gameState
      //si es tu turno se habilita el teclado
      if(gameState.turn === currentPlayerIcon){

        if(gameState.board[cellNumber] === null){ //is available
          newGameState.movements+=1
          newGameState.board[cellNumber] = currentPlayerIcon
          //guardar los estilos
          if(currentPlayerIcon === "X")
            newGameState.turn = "O"
          if(currentPlayerIcon === "O")
            newGameState.turn = "X"

          const whoIsWinner = calculateWinner(newGameState.board)
          if(whoIsWinner?.winner === "X"){
            newGameState.winner = gameState.player_2
            newGameState.result = "Player 2 wins"
            socket.emit("playerWin",gameState.player_2)
            socket.emit("playeDefeat",gameState.player_1)

          }
          else if(whoIsWinner?.winner === "O"){
            newGameState.winner = gameState.player_1
            newGameState.result = "Player 1 wins"
            socket.emit("playerWin",gameState.player_1)
            socket.emit("playeDefeat",gameState.player_2)

          }
          else if(newGameState.movements === 9){
            newGameState.result = "draw"
            newGameState.status = "finished"
            socket.emit("playersDraw",gameState.player_1,gameState.player_2)

          }
          
          socket.emit('newPlayerMovement', newGameState)

        }else{
          alert("invalid movement")
        }

      }else{
        console.log("is not you turn")
      }
    }

    //if the enemy declined the game
    socket.on("gameDeclinedByEnemy",()=>{
      setEnemyStatusText("Your enemy declined the game")
      setShowModalBottons("hidden")
    })

    //if the enemy accepted the game
    socket.on("gameAcceptedByEnemy",()=>{
      setEnemyStatusText("Your enemy accepted the game")
    })


    ///SOCKET EMITS

     //if the user is ready to pairing
    function clickSearchGame(){
      setIsLoading(true)
      socket.emit('searchGame', userData._id)
    }

    //user reject the game
    function declineGame(){
      setShowModalAceptGame(false)
      socket.emit('declineGame', gameState, userData)
    }

    //user accept the game
    function acceptGame(){
      socket.emit('acceptGame', gameState, userData)
    }
    return(
        <main className="bg-amber-300">
            <div className="w-3/12 bg-red-300 Lobby float-left">
              <div className="flex flex-col	">
                <h1>My statics</h1>
                <span>Email: {userData.email}</span>
                <span>Games: {userData.total_games}</span>

                <span>Victories: {userData.victories}</span>
                <span>Defeats: {userData.defeats}</span>
                <span>Draws: {userData.draws}</span>
              </div>
              <div>
                Online players
              </div>
            </div>
            <div className="w-9/12 bg-pink-200 p-4 float-left flex flex-col items-center">
              
             { showBoardGame ? 

                <Board 
                  player={currentPlayerIcon}
                  boardState={gameState.board}
                  labelGameStatus={`is turn of player ${gameState.turn}`}
                  onCellClick={handleCellClick} 
                />
                :undefined }

                <button onClick={clickSearchGame} className="w-4/12 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Find a game</button>
            </div>

            { showModalAceptGame ? 
            <ModalConfirmGame
              player={currentPlayerIcon} 
              onDeclineGame={declineGame} 
              onAcceptGame={acceptGame} 
              enemyStatusText={enemyStatusText}
              showBotons={showModalBottons}
            />
            : undefined } 


            { isLoading ? <ModalLoader /> : undefined } 
              
        </main>
    )
}

