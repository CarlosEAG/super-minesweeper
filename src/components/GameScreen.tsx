import Grid from "./Custom/Grid"
import { Board } from "./Board"
import { Screen } from "./Screen"
import { Timer } from "./Timer"
import { Smiley } from "./Smiley"
import { Flags } from "./Flags"
import { useGameContext } from "../hooks/useGameContext"
import { GAME_STATE } from "../models/GameState"
import { LightBanner } from "./LightBanner"

export const GameScreen = () => {   
    const {gameState:{state},init} = useGameContext();
    const handleInit = () => {
        if(state === GAME_STATE.MAIN){
            init()
        }
    }
    return (
        <>
        {state === GAME_STATE.GAMEOVER && <LightBanner text="Game Over" color="red" loop/>}
        {state === GAME_STATE.WIN && <LightBanner text="You Win!" color="cyan" loop/>}
        <Screen onAnimationComplete={handleInit}>
            <Grid 
            layout 
            transition={{type:'spring', damping:20, stiffness: 400}}
            item container justifyContent="space-between" alignItems="center">
                <Timer/>
                <Smiley/>
                <Flags/>
            </Grid>
            <Grid container justifyContent="center">
                <Board/>
            </Grid>
        </Screen>
        </>
    )
}