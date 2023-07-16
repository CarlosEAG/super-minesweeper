import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Cell, CellID } from "../models/Cell";

export const useBoardCell = () => {
    const {gameState} = useContext(GameContext);
    const getCell = (id:CellID): Cell => {
        return gameState.board.cells[id];
    };

    return {getCell};
}