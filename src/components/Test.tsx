import { useEffect } from "react";
import { useGameContext } from "../hooks/useGameContext"
import { GameContextProvider } from "./GameContextProvider"
import "./Test.css"

export const Test = () => {
    const {gameState:{initialized, board:{size,cells}}, init, setMines} = useGameContext();
    debugger;
    useEffect(()=>{
        init();
    },[]);
    useEffect(()=>{
        if(!initialized){
            return;
        }
        setMines(15);
    },[initialized]);
    const board = [...Array(size.y)].map((_, row) => 
        [...Array(size.x)].map((_, cell) => row*size.x+cell+1)
    );

    return initialized && <GameContextProvider>
        <div className="board">
            {board.map((row => <div className="row">
                {row.map(cell => 
                    <div className="cell">
                        {`${cells[cell-1].hasMine? 'X': cells[cell-1].adjacentMines || '-'}`}
                    </div>
                )}
            </div> ))}
        </div>
    </GameContextProvider> || <div> Initializing...</div>
}