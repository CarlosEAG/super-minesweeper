import { Board } from "../../models/Board";
import { sampleRange } from "../sampleRange";

export const getCellsToBeMined = (board: Board, amount: number): number[] => {
    const cellIds = board.cells.map(cell => cell.id);
    const mineIds = sampleRange(cellIds, amount);
    return mineIds;
};