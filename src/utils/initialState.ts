import { GAME_STATE, GameStateType } from "../models/GameState";

export const initialGameState: GameStateType = {
    state: GAME_STATE.MAIN,
    gameOver: false,
    win: false,
    initialized: false,
    board: {
        cells:[],
        size:{
            x: 15,
            y:10
        }
    },
    flags: 10,
    cellsLeft: 100,
    lastAmountUncovered: 0,
    settings: {
        configuration: {
            size: {
                x: 9,
                y: 9,
            },
            mines: 10,
        },
        difficulty: "Beginner"

    },
}