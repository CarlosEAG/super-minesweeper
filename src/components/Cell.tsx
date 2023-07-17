import { CELL_STATE, CellID } from "../models/Cell"
import { GAME_STATE } from "../models/GameState";
import { useGameContext } from "../hooks/useGameContext";
import { motion } from "framer-motion";
const d= 0.02;
const variants = {
    covered: { 
        opacity: 1,
        scale: 1,
        /*
        transition: { type: "spring", stiffness: 300, damping: 24, duration: d, 
        delayChildren: d,
        staggerChildren: d,}
        //*/
        //rotate: -90,
    },
    uncovered: {
        opacity: 1,
        rotate: 0,
        scale: [0.8, 1.5, 1],
        times: [0.1,0.3,0.1],
        transition: {
            duration: 0.2,
        }
    },
    hidden: {
        opacity: 0,
        scale:0,
        rotate: 90
    },
  }

interface CellProps {
    cellId: CellID;
}
export const Cell: React.FC<CellProps> = ({cellId}) => {    
    const {
        gameState,
        getCell,uncover,
        setMines, 
        setGameOver,
    } = useGameContext();
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

    return <motion.div 
        //initial={"hidden"}
        animate={state === CELL_STATE.COVERED ? "covered" : "uncovered"}
        variants={variants}
        className={state === CELL_STATE.COVERED ? 'cell' : 'uncoveredCell'}
        onClick={handleClick}
        >
            {state === CELL_STATE.FLAGGED && 'F'}
            {state === CELL_STATE.QUESTION_MARKED && '?'}
            {state === CELL_STATE.UNCOVERED && !hasMine && (adjacentMines||'')}
            {state === CELL_STATE.UNCOVERED && hasMine && 'X'}
        </motion.div>
}