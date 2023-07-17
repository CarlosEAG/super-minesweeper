import { useEffect } from "react";
import "./Test.css"
import { Cell } from "./Cell";
import { GAME_STATE } from "../models/GameState";
import { useGameContext } from "../hooks/useGameContext";
import { motion } from "framer-motion";
const u= 0.035;
const variants = (d: number) => ({
    hidden: {
        y:40,
    },
    covered: {
        y: 0,
        transition: {
            //*
            type: "spring", stiffness: 300, damping: 24, 
            //*/
            duration: d, 
        delayChildren: d,
        staggerChildren: d,
        }
    }
})
const variants2 = (d: number) => ({
    hidden: {
        //x:40,
        scale:5,
        opacity:0
    },
    covered: {
        //x: 0,
        scale: 1,
        opacity: 1,
        transition: { 
            //ease: "linear",
            //*
            type: "spring", 
            stiffness: 300, 
            damping: 24,
            //*/ 
            duration: d,
        //delayChildren: d,
        staggerChildren: d,
    }
    }
})
const displayStates = [
    GAME_STATE.INITIALIZED,
    GAME_STATE.GAMEOVER,
    GAME_STATE.MINESPLACED,
]
export const Test = () => {
    const { 
        gameState: {state, board:{size}},
        init
    } = useGameContext();
    useEffect(()=>{
        init();
    },[]);

    const board = [...Array(size.y)].map((_, row) => 
        [...Array(size.x)].map((_, cell) => row*size.x+cell+1)
    );

    
    return displayStates.includes(state)
        && <motion.div
            initial="hidden"
            animate="covered"
            className="board"
            variants={variants(u*(100/(size.x*size.y)))}
        >
            {board.map((row => <motion.div
            //initial="hidden"
            variants={variants(u*(100/(size.x*size.y)))}
            className="row">
                {row.map(cell => 
                <motion.div
                    variants={variants2(u*(100/(size.x*size.y)))}>
                    <Cell cellId={cell}/>
                </motion.div>
                )}
            </motion.div> ))}
        </motion.div>
        || <div> Initializing...</div>
}