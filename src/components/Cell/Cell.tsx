import { CELL_STATE, CellID } from "../../models/Cell"
import { GAME_STATE } from "../../models/GameState";
import { useGameContext } from "../../hooks/useGameContext";
import { useEffect, useState } from "react";
import Box from "../Custom/Box";
import { cellStyles } from "./utils/cellStyles";
import { getDisplayState } from "./utils/getDisplayState";

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
    const [variant, setVariant] = useState('initial');
    useEffect(()=>{
        if(state === CELL_STATE.UNCOVERED){
            setVariant('uncovered');
            return;
        }
        if(state !==CELL_STATE.COVERED){
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
    
    return <Box
        sx={{
            color: 'white',
            width: 25,
            height: 25,
            textAlign: 'center',
            justifyContent: 'center',
            lineHeight:'28px',
            ...(cellStyles[displayState]),
        }}
        onClick={handleClickEvent}
        onContextMenu={handleContextMenuEvent}

        animate={variant}
        whileHover={{
            scale: ["115%", "110%"],
            opacity: [0.5, 1],
            borderRadius: 0,
            transition: {
                type: 'spring',
            },
        }}
        whileTap={{
            scale: ["95%", "150%"],
            opacity: 0.75,
            borderRadius: 3,
            transition: {
                type: 'spring',
            },
        }}
        variants={{
            initial: {
                opacity: 1,
                scale: "100%",
            },
            uncovered: {
                opacity: 1,
                rotate:0, //mf hack that somehow makes the animate value to actually go back to initial
                scale: "170%",
                transition: {
                    type: 'spring',
                    duration: 0.2,
                    onComplete: () => setVariant('initial'),
                }
            },
        }}
        >
            {content}
        </Box>
}