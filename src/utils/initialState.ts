import { GAME_STATE, GameStateType } from "../models/GameState";

export const initialGameState: GameStateType = {
    state: GAME_STATE.MAIN,
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
    flags: 10,
    settings: {
        size: {
            x: 10,
            y: 10
        },
        mines: 10,
        difficulty: "beginner"

    },
}