import { useContext, useEffect } from "react";
import "./Test.css"
import { Cell } from "./Cell";
import { GameContext } from "../contexts/GameContext";
import { GAME_STATE } from "../models/GameState";

const displayStates = [
    GAME_STATE.INITIALIZED,
    GAME_STATE.GAMEOVER,
    GAME_STATE.MINESPLACED,
]
export const Test = () => {
    const { 
        gameState: {state, board:{size}},
        init
    } = useContext(GameContext);
    useEffect(()=>{
        init();
    },[]);

    const board = [...Array(size.y)].map((_, row) => 
        [...Array(size.x)].map((_, cell) => row*size.x+cell+1)
    );

    
    return displayStates.includes(state)
        && <div className="board">
            {board.map((row => <div className="row">
                {row.map(cell => 
                    <Cell cellId={cell}/>
                )}
            </div> ))}
        </div>
        || <div> Initializing...</div>
}