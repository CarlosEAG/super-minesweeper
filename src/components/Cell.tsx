import { CELL_STATE, CellID } from "../models/Cell"
import { GAME_STATE } from "../models/GameState";
import { useGameContext } from "../hooks/useGameContext";

interface CellProps {
    cellId: CellID;
}
export const Cell: React.FC<CellProps> = ({cellId}) => {    
    const {
        gameState,
        getCell,cycleCell,uncover,
        setMines, 
        setGameOver,
    } = useGameContext();
    const {state, hasMine, adjacentMines} = getCell(cellId); //board.cells[props.cellId-1];
    const handleClickEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
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
    const handleContextMenuEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        cycleCell(cellId);
    }
    
    return <div 
        className={state === CELL_STATE.COVERED ? 'cell' : 'uncoveredCell'}
        onClick={handleClickEvent}
        onContextMenu={handleContextMenuEvent}
        >
            {state === CELL_STATE.FLAGGED && 'F'}
            {state === CELL_STATE.QUESTION_MARKED && '?'}
            {state === CELL_STATE.UNCOVERED && !hasMine && (adjacentMines||'')}
            {state === CELL_STATE.UNCOVERED && hasMine && 'X'}
        </div>
}