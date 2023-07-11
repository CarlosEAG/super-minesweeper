import { Board } from "../../models/Board";
import { BoardDimensions } from "../../models/BoardDimensions";
import { CELL_STATE } from "../../models/Cell";

export const generateBoard = ({x, y}: BoardDimensions): Board => {
    const size = x*y;
    const ids = [...Array(size)].map((_,id) => id+1);
    const cells = ids.map( id => ({
        id,
        state: CELL_STATE.COVERED,
        adjacentMines: 0,
        hasMine: false,
        /*
        isCovered: true,
        isFlagged: false,
        isQuestionMarked: false,
        hasAdjacentMine: false,
        //*/
    }));
    const board = {
        cells,
        size: {x,y},
    };
    return board;
};