import { Board } from "../../models/Board";
import { CellID } from "../../models/Cell";
import { sampleRange } from "../sampleRange";

export const getCellsToBeMined = (board: Board, amount: number, excludedId: CellID): number[] => {
    const cellIds = board.cells.map(cell => cell.id);
    const filteredIds = cellIds.filter(id => id !== excludedId);
    const mineIds = sampleRange(filteredIds, amount);
    return mineIds;
};