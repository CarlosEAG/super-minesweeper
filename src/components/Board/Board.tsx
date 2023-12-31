import { Cell } from "../Cell";
import { GAME_STATE } from "../../models/GameState";
import { useGameContext } from "../../hooks/useGameContext";
import Paper from "../Custom/Paper";
import Grid from "../Custom/Grid";
import { useGameCycle } from "../../hooks/useGameCycle";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export const Board = () => {
    const {
        gameState: { state, board: { size } },
    } = useGameContext();
    const controls = useAnimation();
    const runInitAnimation = () => {
        controls.set("hidden");
        controls.start("visible");
    }
    useEffect(()=>{
        runInitAnimation();
    },[]);
    useEffect(() => {
        if(state === GAME_STATE.INITIALIZED){
            runInitAnimation();
        }
    },[state]);
    useGameCycle();

    const board = [...Array(size.y)].map((_, row) =>
        [...Array(size.x)].map((_, cell) => row * size.x + cell + 1)
    );

    const transitionFactor = 100 / (size.x * size.y);
    const transitionSpeed = transitionFactor * 0.035;
    
    return (
        state !== GAME_STATE.MAIN &&
        <Paper
            variant="main"
            >
            <Grid
                container
                spacing={1}
                sx={{ display: 'grid' }}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: {
                        scale: 0,
                      },
                    visible: {
                        scale: 1,
                        transition: {
                          delayChildren: 0, // Retrasa el inicio de las animaciones de los hijos
                          staggerChildren: transitionSpeed, // Establece un intervalo entre las animaciones de los hijos
                          when: 'beforeChildren', // Espera a que terminen las animaciones de los hijos
                        },
                      },
                }}
            >
                {board.map((row =>
                    <Grid
                        item
                        container
                        spacing={1}
                        xs={12}
                        sx={{ width: 'fit-content', flexWrap:'nowrap' }}
                        variants={{
                            hidden: {
                                opacity: 0,
                              },
                            visible: {
                                opacity: 1,
                                transition: {
                                  staggerDirection: 1, // Establece la dirección del intervalo entre los hijos
                                  staggerChildren: transitionSpeed, // Establece un intervalo entre las animaciones de los hijos
                                },
                              },
                        }}
                    >
                        {row.map(cell =>
                            <Grid item variants={{
                                hidden: {
                                    opacity: 0,
                                    scale: 5,
                                  },
                                  visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 300, 
                                        damping: 24,
                                        duration: transitionSpeed,
                                    }
                                  },
                                  
                            }}>
                                <Cell cellId={cell} />
                            </Grid>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}