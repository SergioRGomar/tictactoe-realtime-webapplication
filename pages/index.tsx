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
import Navbar from "@/components/Navbar"
import WarningNavBar from "@/components/WarningNavBar"

const socket = io('http://localhost:3001')

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

let pairingAttempts = 0

const cell_style_default = "hover:bg-zinc-300 m-1 text-4xl font-sigmar_ font-black w-14 h-14 rounded-lg flex items-center justify-center bg-white shadow-lg"
const cell_style_player_1 = "text-red-500"
const cell_style_player_2 = "text-blue-500"
const cell_style_winner = "text-green-60"

export default function Home(){

    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isUserInGame, setIsUserInGame] = useState(false)

    const [currentPlayerIcon, setCurrentPlayerIcon] = useState("without player")
    const [userData,setUserData] = useState(initUserData)
    const [gameState,setGameState] = useState(initGameData)

    const [enemyStatusText, setEnemyStatusText] = useState("Waiting for your opponent's response..")

    const [showModalAceptGame, setShowModalAceptGame] = useState(false)
    const [showModalBottons, setShowModalBottons] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [labelTurn, setLabelTurn] = useState("")

    const [movementAlert, setMovementAlert] = useState("")

    const [cellStyles,setCellStyles] = useState(Array(9).fill(cell_style_default))


    useEffect(() => {
      const user_id = getCookie('user_id_tictactoe')
      if(user_id){
        setIsUserLogged(true)
        getUser(user_id).then((response)=>{
          setUserData(response.user)
          socket.emit('newUserOnline', response.user._id)
        })
      }
              
    }, []);


    //Si los 2 usuarios aceptaron el juego
    socket.on("startGame",(objGame)=>{
      setShowModalAceptGame(false)
      setIsUserInGame(true)
    })

    //Si el emparajuemto fue satifactorio
    socket.on("initGame",(objGame)=>{
      pairingAttempts = 0
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

    //to process movements of the users
    socket.on("updateGame",(objGame)=>{
      setGameState(objGame)

      if(objGame.result === "draw"){
        setLabelTurn("Game finished in draw")

        setTimeout(()=>{
          location.href="/"
        },4000)

        setMovementAlert("Reloading website...")

      }

      if(objGame.winner !== null){
        if(objGame.winner._id === getCookie('user_id_tictactoe'))
          setLabelTurn("YOU ARE THE WINNER!")
        else
          setLabelTurn("You lost!")

        setTimeout(()=>{
          location.href="/"
        },4000)
        setMovementAlert("Reloading website...")
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
          setMovementAlert("invalid movement")

          setTimeout(()=>{
            setMovementAlert("")
          },3000)
        }

      }else{
        if(gameState.status === "created")
          setMovementAlert("is not you turn")
        else 
          setMovementAlert("init a game first")

        setTimeout(()=>{
          setMovementAlert("")
        },3000)
      }
    }

    //if the enemy declined the game
    socket.on("gameDeclinedByEnemy",()=>{
      setEnemyStatusText("Your enemy declined the game, reload the website to search another game")
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
      pairingAttempts+=1
      console.log(pairingAttempts)
      //this recursive call to function removes a bug in pairing 
      setTimeout(()=>{
        if(pairingAttempts >= 5){
          pairingAttempts = 0
          alert("No players online, try again later.")
          setIsLoading(false)
          return;
        }
        if(pairingAttempts !== 0){
          socket.emit('searchGame', userData._id)
          clickSearchGame()
        }
      },2000)

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
        <>          
          <Navbar/>

        { isUserLogged ?

          <div className="float-left w-full mt-3 ">
            <div className="w-full flex flex-col items-center">
              
              <div className="sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 w-10/12 text-white flex flex-col items-center	p-5 m-3 bg-zinc-800 ">
                <h1 className="text-3xl"> TIC TAC TOE GAME </h1>
              </div>
              
              <div className="sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 w-10/12 bg-zinc-800 p-4 float-left items-center rounded-3xl p-5 ">

                  <Board 
                    player={currentPlayerIcon}
                    boardState={gameState.board}
                    labelGameStatus={labelTurn}
                    onCellClick={handleCellClick} 
                    isGameStart={isUserInGame}
                    movementAlert={movementAlert}
                    cellStyle={cellStyles}
                  />

              
              </div>

              <button onClick={clickSearchGame} className="sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12 w-6/12 m-8 bg-zinc-700 hover:bg-zinc-900 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">Find a game</button>

            </div>
          </div>

        : <WarningNavBar/>  }

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
              
        </>
        )
}

