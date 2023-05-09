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
import Ladeboard from "@/components/Ladeboard"
import UserData from "@/components/UserData"
import Navbar from "@/components/Navbar"

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
    const [showBoardGame, setShowBoardGame] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [labelTurn, setLabelTurn] = useState("")


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
      if(objGame.player_1._id === getCookie('user_id_tictactoe')){
        setCurrentPlayerIcon("O")
        setLabelTurn("Is your turn")
      }else{
        setCurrentPlayerIcon("X")
        setLabelTurn("Is turn of the enemy")
      }
      setShowModalAceptGame(true)
    })

    socket.on("updateGame",(objGame)=>{
      setGameState(objGame)

      if(objGame.result === "draw"){
        setLabelTurn("Draw")
        setTimeout(()=>{
          location.href="/"
        },3000)
      }

      if(objGame.winner !== null){
        if(objGame.winner._id === getCookie('user_id_tictactoe'))
          setLabelTurn("YOU ARE THE WINNER!")
        else
          setLabelTurn("You lost!")

          setTimeout(()=>{
            location.href="/"
          },3000)
      }


      if(objGame.result === ""){
        if(objGame.turn === currentPlayerIcon)
          setLabelTurn("Is your turn")
        else 
          setLabelTurn("Is turn of the enemy")
      }
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

          if(currentPlayerIcon === "X"){
            newGameState.turn = "O"
          }
          if(currentPlayerIcon === "O"){
            newGameState.turn = "X"
          }

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
        alert("is not you turn")
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
        <main>

            <Navbar/>

            <div className="w-8/12 bg-zinc-700 p-4 float-left items-center">
             { showBoardGame ? 

                <Board 
                  player={currentPlayerIcon}
                  boardState={gameState.board}
                  labelGameStatus={labelTurn}
                  onCellClick={handleCellClick} 
                />
                :undefined }

              <button onClick={clickSearchGame} className="m-8 w-4/12 bg-amber-300 hover:bg-amber-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Find a game</button>
            </div>

            <div className="w-2/12 p-4 float-left ">
              
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

