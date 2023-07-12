import { useEffect, useState } from "react";
import { useGameContext } from "../hooks/useGameContext"
import { GameContextProvider } from "./GameContextProvider"
import "./Test.css"
import { CELL_STATE } from "../models/Cell";

export const Test = () => {
    const {gameState:{initialized, board:{size,cells}}, init, setMines, uncover} = useGameContext();
    debugger;
    const [minesPlaced, setMinesPlaced] = useState(false);
    useEffect(()=>{
        init();
    },[]);
    useEffect(()=>{
        if(!initialized){
            setMinesPlaced(true);
            return;
        }
        setMines(15);
    },[initialized]);

    useEffect(()=>{
        if(!minesPlaced){
            return;
        }
        uncover(15);
    },[minesPlaced])
    const board = [...Array(size.y)].map((_, row) => 
        [...Array(size.x)].map((_, cell) => row*size.x+cell+1)
    );

    return initialized && <GameContextProvider>
        <div className="board">
            {board.map((row => <div className="row">
                {row.map(cell => 
                    <div className={cells[cell-1].state === CELL_STATE.COVERED ? "cell" : "uncoveredCell"}>
                        {//*
                        `${cells[cell-1].hasMine? 'X': cells[cell-1].adjacentMines || '-'}`
                        //*/
                        }
                        {/*
                        `${cells[cell-1].state === CELL_STATE.COVERED ? '-' : cells[cell-1].adjacentMines||''}`
                        //*/
                        }
                    </div>
                )}
            </div> ))}
        </div>
    </GameContextProvider> || <div> Initializing...</div>
}