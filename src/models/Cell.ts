 
export enum CELL_STATE {
        COVERED,
        UNCOVERED,
        FLAGGED,
        QUESTION_MARKED,
        /*
        MINED: 3,
        WRONG_FLAG: 4,
        CLIKED_MINE: 5,
        //*/
    };

export type CellID = number;
export type cellState = CELL_STATE.COVERED | CELL_STATE.UNCOVERED | CELL_STATE.FLAGGED | CELL_STATE.QUESTION_MARKED;

export interface Cell {
        /*
        id: number,
        state: typeof CELL_STATE, //TODO
        adjacentMines: number,
        hasMine: boolean,
        //*/
        /*
        isCovered: boolean,
        isFlagged: boolean,
        isQuestionMarked: boolean,
        hasAdjacentMine: boolean,
        //*/
        id: CellID,
        state: cellState,
        adjacentMines: number,
        hasMine: boolean,
};