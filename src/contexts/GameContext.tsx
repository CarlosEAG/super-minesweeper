import { createContext } from "react";
import { GameStateType } from "../models/GameState";

const GameState: GameStateType = {
    gameOver: false,
    win: false,
    board: {
        cells: [],
        size: {
            x: 0,
            y:0,
        },
    },
    settings: {
        size:{
            x:0,
            y:0,
        },
        mines:10,
        difficulty: 'beginner'
    },
};

export const GameContext = createContext(GameState);







