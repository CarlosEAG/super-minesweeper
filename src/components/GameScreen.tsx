import Grid from "./Custom/Grid"
import { Board } from "./Board"
import Screen from "./Screen"
import { Timer } from "./Timer"
import { Smiley } from "./Smiley"
import { Flags } from "./Flags"
import { useGameContext } from "../hooks/useGameContext"

export const GameScreen = () => {   
    const {init} = useGameContext();

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
        onAnimationComplete={init}
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