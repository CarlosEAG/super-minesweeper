import { BoardDimensions } from "./BoardDimensions"
import { Cell } from "./Cell"

export interface Board {
    cells: Cell[],
    size: BoardDimensions,
};