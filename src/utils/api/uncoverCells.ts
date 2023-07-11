//This alternative gets a list of the cells to be uncovered instead of directly modifying the board state,

import { getCellsToUncover } from "./getCellsToUncover";
import { Board } from "../../models/Board";
import { CELL_STATE, CellID } from "../../models/Cell";

//then it returns a copy of the board that implements the state change
export const uncoverCells = (board: Board, id: CellID) => {
    const cellsToUncover = getCellsToUncover(board, id);
    const newBoard = {
        ...board,
        cells: board.cells.map((cell, id) => ({
            ...cell,
            state: cellsToUncover.includes(id) ? CELL_STATE.UNCOVERED : cell.state,
        }))
    }
    return newBoard;
}