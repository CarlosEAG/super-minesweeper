import { GameStateType } from "../models/GameState";

export const initialGameState: GameStateType = {
    gameOver: false,
    win: false,
    board: {
        cells:[],
        size:{
            x: 0,
            y:0
        }
    },
    settings: {
        size: {
            x: 0,
            y: 0
        },
        mines: 0
    },
    difficulty: "woops"
}