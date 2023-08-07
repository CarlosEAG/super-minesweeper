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
        if(event.button!==0){
            return;
        }
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
            width: {xs:12, sm: 17, md: 25},
            height: {xs:12, sm: 17, md: 25},
            textAlign: 'center',
            justifyContent: 'center',
            lineHeight:{xs:'14px',sm:'28px', md:'28px'},
            fontSize:{xs:12, sm:16, md: 16},
            ...(cellStyles[displayState]),
        }}
        onMouseDownCapture={handleClickEvent}
        onContextMenu={handleContextMenuEvent}

        animate={variant}
        variants={{
            initial: {
                opacity: 1,
                scale: "100%",
            },
            uncovered: {
                opacity: 1,
                scale: ["45%","110%"],
                transition: {
                    type: 'spring',
                    duration: 0.335,
                    onComplete: () => setVariant('initial')
                }
            },
            hovered: {
                scale: ["105%", "125%"],
                opacity: [0.5, 1],
                borderRadius: 0,
                transition: {
                    duration:0.2,
                },
            },
        }}
        onMouseEnter={()=>setVariant((currentVariant)=>currentVariant === 'initial' ? 'hovered':currentVariant)}
        onMouseLeave={()=> setVariant((currentVariant)=>currentVariant === 'hovered' ? 'initial' : currentVariant)}
        >
            {content}
        </Box>
}