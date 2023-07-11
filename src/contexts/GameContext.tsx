import { createContext, useReducer } from "react";
import { GameStateReducer } from "../api/reducers/GameStateReducer";

const GameState = {
    gameOver: false,
    win: false,
    board: {
        cells: [],
        size: {
            x: 10,
            y:10,
        },
    },
    settings: {
        size:{
            x:10,
            y:10,
        },
        mines:10,
    },
    difficulty: 'beginer',
};

export const GameContext = createContext(GameState);

const useGameAPI = () => {

    const [state, dispatch] = useReducer(GameStateReducer, GameContext);
}







