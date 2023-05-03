import { useState } from "react";
import Cell from "./Cell";

const cell_style_0 = "m-1 text-4xl font-sigmar_ font-black w-14 h-14 rounded-lg flex items-center justify-center bg-white shadow-lg"
const cell_style_1 = "text-red-500"
const cell_style_2 = "text-blue-500"

const cell_style_winner = "text-green-600 m-1 text-4xl font-sigmar_ font-black w-14 h-14 rounded-lg flex items-center justify-center bg-white shadow-lg"

let winArray = [0,0,0]

export default function Board(){

    const [cells, setCells] = useState(Array(9).fill(null))
    const [cellStyles, setCellStyles] = useState(Array(9).fill(cell_style_0))

    //true:x-false:o
    const [playerTurn, setPlayerTurn] = useState(true)

    const [labelGameStatus, setLabelGameStatus] = useState("Turn of player X")

    const [movements, setMovements] = useState(0)

    const [gameStatus, setGameStatus] = useState("onGame")

    function handleCellClick(i:number) {
        
        const newCells = cells.slice();
        const newCellStyles = cellStyles.slice();
        
        if(gameStatus === "finish"){
            return
        }

        if(cells[i] === null){
            setMovements(movements+1)
            if(playerTurn){
                newCells[i] = 'X'
                newCellStyles[i] += " "+cell_style_1
                setLabelGameStatus("Turn of player O")
            }
            else{
                newCells[i] = 'O'
                newCellStyles[i] += " "+cell_style_2
                setLabelGameStatus("Turn of player X")
            }
            setCellStyles(newCellStyles)
            setCells(newCells)
            setPlayerTurn(!playerTurn)
        }else{
            setLabelGameStatus("Invalid movement")
        }

        if(calculateWinner(newCells) === "X"){
            setGameStatus("finish")
            setLabelGameStatus("Player X win")
            newCellStyles[winArray[0]] = cell_style_winner
            newCellStyles[winArray[1]] = cell_style_winner
            newCellStyles[winArray[2]] = cell_style_winner
            setCellStyles(newCellStyles)
        }
        else if(calculateWinner(newCells) === "O"){
            setGameStatus("finish")
            setLabelGameStatus("Player O win")
            newCellStyles[winArray[0]] = cell_style_winner
            newCellStyles[winArray[1]] = cell_style_winner
            newCellStyles[winArray[2]] = cell_style_winner
            setCellStyles(newCellStyles)
        }
        else if(movements === 8){
            setGameStatus("finish")
            setLabelGameStatus("Game finished in draw")
            return
        }            
    }

    return(
        <>
            <div className=" bg-amber-700">
                <div className="bg-red-300 flex flex-col items-center	">
                    <h1>TIC TAC TOE GAME</h1>
                    <h1>You are the player O</h1>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <span className="w-full text-center	">{labelGameStatus}</span>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[0]} value={cells[0]} onCellClick={() => handleCellClick(0)} />
                    <Cell cellStyle={cellStyles[1]} value={cells[1]} onCellClick={() => handleCellClick(1)}/>
                    <Cell cellStyle={cellStyles[2]} value={cells[2]} onCellClick={() => handleCellClick(2)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[3]} value={cells[3]} onCellClick={() => handleCellClick(3)}/>
                    <Cell cellStyle={cellStyles[4]} value={cells[4]} onCellClick={() => handleCellClick(4)}/>
                    <Cell cellStyle={cellStyles[5]} value={cells[5]} onCellClick={() => handleCellClick(5)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[6]} value={cells[6]} onCellClick={() => handleCellClick(6)}/>
                    <Cell cellStyle={cellStyles[7]} value={cells[7]} onCellClick={() => handleCellClick(7)}/>
                    <Cell cellStyle={cellStyles[8]} value={cells[8]} onCellClick={() => handleCellClick(8)}/>
                </div>
               
            
            </div>
        </>
    )
}


function calculateWinner(squares:any) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        //console.log(a,b,c)
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winArray = [a,b,c]
            return squares[a];
        }
    }
    return null;
}

