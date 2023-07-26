import Grid from "./Custom/Grid"
import { Board } from "./Board"
import Screen from "./Screen"
import { Timer } from "./Timer"
import { Smiley } from "./Smiley"
import { Flags } from "./Flags"
import { useGameContext } from "../hooks/useGameContext"
import { GAME_STATE } from "../models/GameState"

export const GameScreen = () => {   
    const {gameState:{state},init} = useGameContext();
    const handleInit = () => {
        if(state === GAME_STATE.MAIN){
            init()
        }
    }
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
        }}
        onAnimationComplete={handleInit}
        >
            <Grid 
            layout 
            transition={{type:'spring', damping:20, stiffness: 400}}
            item container justifyContent="space-between" alignItems="center">
                <Timer/>
                <Smiley/>
                <Flags/>
            </Grid>
            <Board/>
        </Screen>
    )
}