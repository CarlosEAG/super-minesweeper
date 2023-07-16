import { createContext } from "react";
import { initialGameState } from "../utils/initialState";
import { Cell, CellID } from "../models/Cell";
import { GameReducerType } from "../hooks/useGameReducer";

const initialGameContext: GameReducerType = {
    gameState:initialGameState,
        init: ()=>{},
        setMines: (clickedCellId: CellID)=>{},
        uncover: (clickedCellId: CellID)=>{},
        updateCell: <T extends keyof Cell>(id: CellID, property:T, value: Cell[T])=>{},
        setGameOver: ()=>{},
        setWin: ()=>{},
        setBoardSize: ()=>{},
        setDifficulty: ()=>{},

        getCell: (id:CellID):Cell=>({
            id: 0,
            hasMine: false,
            adjacentMines: 0,
            state: 0,
        }),
}

export const GameContext = createContext(initialGameContext);







