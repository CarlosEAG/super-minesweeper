import { Board } from "./Board";

export interface GameStateType {
    gameOver: boolean;
    win: boolean;
    initialized: boolean;
    board: Board;
    settings: {
        size: {
            x: number;
            y: number;
        };
        mines: number;
        difficulty: 'beginner' | 'intermediate' | 'expert' | 'custom'
    };
}