import { Grid } from "@mui/material"
import { Board } from "./Board"
import Screen from "./Screen"
import { Timer } from "./Timer"
import { Smiley } from "./Smiley"
import { Flags } from "./Flags"
import { useGameContext } from "../hooks/useGameContext"
import { GAME_STATE } from "../models/GameState"
import { useEffect } from "react"

export const GameScreen = () => {   
    const {
        gameState: { state},
        init,
        audio,
    } = useGameContext();
    useEffect(() => {
        if (state === GAME_STATE.MAIN) {
            audio.playTitle();
        }
    }, []);


    const onTitleAnimation = state === GAME_STATE.MAIN;
    return (
        <Screen 
        initial={{
            scale:0,
        }}
        animate={{
            scale:1,
        }}
        transition={{
            type:'spring',
            duration: 0.335,
            delay: onTitleAnimation ? 7 : 0,
        }}
        onAnimationComplete={init}
        >
            {onTitleAnimation ? <></> : <>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Timer/>
                    <Smiley/>
                    <Flags/>
                </Grid>
                <Board/>
            </>
            }
        </Screen>
    )
}