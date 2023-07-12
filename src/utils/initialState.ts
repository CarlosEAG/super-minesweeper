import { GameStateType } from "../models/GameState";

export const initialGameState: GameStateType = {
    gameOver: false,
    win: false,
    initialized: false,
    board: {
        cells:[],
        size:{
            x: 10,
            y:10
        }
    },
    settings: {
        size: {
            x: 10,
            y: 10
        },
        mines: 10,
        difficulty: "beginner"

    },
}