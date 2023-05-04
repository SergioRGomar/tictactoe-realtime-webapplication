import { useState } from "react";
import Cell from "./Cell";

const cell_style_default = "m-1 text-4xl font-sigmar_ font-black w-14 h-14 rounded-lg flex items-center justify-center bg-white shadow-lg"
const cell_style_player_1 = "text-red-500"
const cell_style_player_2 = "text-blue-500"

const cell_style_winner = "text-green-600 m-1 text-4xl font-sigmar_ font-black w-14 h-14 rounded-lg flex items-center justify-center bg-white shadow-lg"


export default function Board(props:any){

    const [cells, setCells] = useState(props.board)
    const [cellStyles, setCellStyles] = useState(Array(9).fill(cell_style_default))

    return(
        <>
            <div className=" bg-amber-700">
                <div className="bg-red-300 flex flex-col items-center	">
                    <h1>TIC TAC TOE GAME</h1>
                    <h1>You are the player {props.player}</h1>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <span className="w-full text-center	">{props.labelGameStatus}</span>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[0]} value={props.boardState[0]} onCellClick={() => props.onCellClick(0)} />
                    <Cell cellStyle={cellStyles[1]} value={props.boardState[1]} onCellClick={() => props.onCellClick(1)}/>
                    <Cell cellStyle={cellStyles[2]} value={props.boardState[2]} onCellClick={() => props.onCellClick(2)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[3]} value={props.boardState[3]} onCellClick={() => props.onCellClick(3)}/>
                    <Cell cellStyle={cellStyles[4]} value={props.boardState[4]} onCellClick={() => props.onCellClick(4)}/>
                    <Cell cellStyle={cellStyles[5]} value={props.boardState[5]} onCellClick={() => props.onCellClick(5)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={cellStyles[6]} value={props.boardState[6]} onCellClick={() => props.onCellClick(6)}/>
                    <Cell cellStyle={cellStyles[7]} value={props.boardState[7]} onCellClick={() => props.onCellClick(7)}/>
                    <Cell cellStyle={cellStyles[8]} value={props.boardState[8]} onCellClick={() => props.onCellClick(8)}/>
                </div>
            
            </div>
        </>
    )
}


