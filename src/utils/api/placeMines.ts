import { getAdjacentCells } from "./getAdjacentCells";
import { getCellsToBeMined } from "./getCellsToBeMined";
import { Board } from "../../models/Board";

/*
const placeMines = (board: Board, mines: number): Board => {
    const ids = board.cells.map(cell => cell.id);
    const mineIds = sampleRange(ids, mines);
    mineIds.forEach(id => {
        board.cells[id].hasMine = true;
        const adjacentCellIds = getAdjacentCells(board.size, id);
        adjacentCellIds.forEach(id => {
            board.cells[id].adjacentMines += 1;
        })
    });
    return board;
};
//*/



export const placeMines = (board: Board, mines: number): Board => {

    const ids = getCellsToBeMined(board, mines);
    const newBoard = {
        ...board, 
        cells: board.cells.map(cell => ids.includes(cell.id) ? {...cell, hasMine: true} : cell),
    };

    ids.forEach(id => {
        //newBoard.cells[id].hasMine = true;
        const adjacentCellIds = getAdjacentCells(newBoard.size, id);
        adjacentCellIds.forEach(id => {
            newBoard.cells[id].adjacentMines += 1;
        })
    });

    return newBoard;
};