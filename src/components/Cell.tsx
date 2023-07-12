import { useContext } from "react";
import { CELL_STATE, CellID } from "../models/Cell"
import { GameContext } from "../contexts/GameContext";
import { GAME_STATE } from "../models/GameState";

interface CellProps {
    cellId: CellID;
}
export const Cell: React.FC<CellProps> = ({cellId}) => {    
    const {
        gameState,
        getCell,uncover,
        setMines, 
        setGameOver,
    } = useContext(GameContext);
    const {state, hasMine, adjacentMines} = getCell(cellId); //board.cells[props.cellId-1];
    const handleClick = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(gameState.state === GAME_STATE.GAMEOVER){
            return;
        }
        if(gameState.state === GAME_STATE.INITIALIZED){
            setMines(cellId);
        }
        if(hasMine){
            setGameOver();
            return;
        }
        uncover(cellId);
    }
    
    return <div 
        className={state === CELL_STATE.COVERED ? 'cell' : 'uncoveredCell'}
        onClick={handleClick}
        >
            {state === CELL_STATE.FLAGGED && 'F'}
            {state === CELL_STATE.QUESTION_MARKED && '?'}
            {state === CELL_STATE.UNCOVERED && !hasMine && (adjacentMines||'')}
            {state === CELL_STATE.UNCOVERED && hasMine && 'X'}
        </div>
}