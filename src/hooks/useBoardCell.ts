import { Cell, CellID } from "../models/Cell";
import { useGameContext } from "./useGameContext"

export const useBoardCell = () => {
    const {gameState} = useGameContext();
    const getCell = (id:CellID): Cell => {
        return gameState.board.cells[id];
    };

    return {getCell};
}