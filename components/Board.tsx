import Cell from "./Cell";

type boardProps = {
    player:string,
    boardState:Array<string>
    labelGameStatus:string,
    onCellClick:Function,
    isGameStart:boolean,
    movementAlert:string,
    cellStyle:Array<string>
}
export default function Board(props:boardProps){

    
    return(
        <>
            <div className="bg-zinc-900 w-full p-5">
                
                {props.isGameStart ? 
                <div className="flex flex-col text-white items-center">
                    <h1 className="text-green-400">You are the player {props.player}</h1>
                </div>
                : 
                <div className="flex flex-col">
                    <div className="float-left w-full bg-red-800 text-white p-2 text-sm text-center">
                        <h1>Status: NOT IN GAME. To play a game, click on the &quot;Find a Game&quot; button</h1>
                    </div>
                </div>
                }

                <div className="flex flex-col text-white items-center">
                    <span className="w-full m-4 font-black w-full text-center text-2xl">{props.labelGameStatus}</span>
                </div>

                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={props.cellStyle[0]} value={props.boardState[0]} onCellClick={() => props.onCellClick(0)} />
                    <Cell cellStyle={props.cellStyle[1]} value={props.boardState[1]} onCellClick={() => props.onCellClick(1)}/>
                    <Cell cellStyle={props.cellStyle[2]} value={props.boardState[2]} onCellClick={() => props.onCellClick(2)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={props.cellStyle[3]} value={props.boardState[3]} onCellClick={() => props.onCellClick(3)}/>
                    <Cell cellStyle={props.cellStyle[4]} value={props.boardState[4]} onCellClick={() => props.onCellClick(4)}/>
                    <Cell cellStyle={props.cellStyle[5]} value={props.boardState[5]} onCellClick={() => props.onCellClick(5)}/>
                </div>
                <div className="board-row flex flex-row justify-center">
                    <Cell cellStyle={props.cellStyle[6]} value={props.boardState[6]} onCellClick={() => props.onCellClick(6)}/>
                    <Cell cellStyle={props.cellStyle[7]} value={props.boardState[7]} onCellClick={() => props.onCellClick(7)}/>
                    <Cell cellStyle={props.cellStyle[8]} value={props.boardState[8]} onCellClick={() => props.onCellClick(8)}/>
                </div>

                <div className="flex flex-col m-3">
                    <div className="float-left w-full  p-2 text-red-500 text-sm text-center">
                        <h1>{props.movementAlert}</h1>
                    </div>
                </div>
                
            </div>
        </>
    )
}


