import { Board } from "./Board";
import { Settings } from "./Settings";
export enum GAME_STATE {
    MAIN,
    INITIALIZED,
    MINESPLACED,
    GAMEOVER,
    WIN,
    PAUSE,
};

export type gameState = GAME_STATE.MAIN
    | GAME_STATE.INITIALIZED
    | GAME_STATE.MINESPLACED
    | GAME_STATE.GAMEOVER
    | GAME_STATE.WIN
    | GAME_STATE.PAUSE;

export interface GameStateType {
    state: gameState;
    gameOver: boolean;
    win: boolean;
    initialized: boolean;
    board: Board;
    flags: number;
    cellsLeft: number;
    lastAmountUncovered: number;
    settings: Settings;
}