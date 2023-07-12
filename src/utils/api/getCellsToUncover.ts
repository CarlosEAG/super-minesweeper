import { getAdjacentCells } from "./getAdjacentCells";
import { Board } from "../../models/Board";
import { CELL_STATE, CellID } from "../../models/Cell";

const invalidStates = [CELL_STATE.UNCOVERED, CELL_STATE.FLAGGED, CELL_STATE.QUESTION_MARKED];

export const getCellsToUncover = (board: Board, id: CellID): CellID[] => {
    const ids = [id];
    const {cells} = board;
    const outputIds: CellID[] = [];
    while(ids.length > 0) {
        const currentId = ids.shift()!;
        const currentCell = cells[currentId-1];
        if(invalidStates.includes(currentCell.state) || outputIds.includes(currentCell.id)) {
            continue;
        }
        if(currentCell.adjacentMines > 0) {
            outputIds.push(currentId);
            continue;
        }
        outputIds.push(currentId);
        
        ids.push(...getAdjacentCells(board.size,currentId));
    }
    return outputIds;
};