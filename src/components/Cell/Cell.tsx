import { CELL_STATE, CellID } from "../../models/Cell"
import { GAME_STATE } from "../../models/GameState";
import { useGameContext } from "../../hooks/useGameContext";
import { useEffect } from "react";
import Box from "../Custom/Box";
import { cellStyles } from "./utils/cellStyles";
import { getDisplayState } from "./utils/getDisplayState";
import { motionProps } from "./motion";

interface CellProps {
    cellId: CellID;
}
export const Cell: React.FC<CellProps> = ({cellId}) => {  
    const {
        gameState,
        getCell,cycleCell,uncover,
        setMines, 
        setGameOver,
        audio,
    } = useGameContext();
    const {state, hasMine, adjacentMines} = getCell(cellId);

    useEffect(()=>{
        if(state !== CELL_STATE.UNCOVERED && state != CELL_STATE.COVERED){
            audio.playFlagged();
        }
    },[state]);

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
        if(gameState.state === GAME_STATE.GAMEOVER){
            return;
        }
        cycleCell(cellId);
    }

    const [displayState, content] = getDisplayState(state,hasMine,adjacentMines, gameState.state === GAME_STATE.GAMEOVER);

    const animationProps = {
        animate: state === CELL_STATE.COVERED ? "initial" : "uncovered",
        ...motionProps
    }
    return <Box
        sx={{
            color: 'white',
            width: 25,
            height: 25,
            textAlign: 'center',
            justifyContent: 'center',
            ...(cellStyles[displayState]),
        }}
        {...animationProps}
        onClick={handleClickEvent}
        onContextMenu={handleContextMenuEvent}
        >
            {content}
        </Box>
}