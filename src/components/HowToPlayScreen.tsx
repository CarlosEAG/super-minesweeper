import { Button, Grid, Typography } from "@mui/material"
import { Screen } from "./Screen"
import Paper from "./Custom/Paper"
import { useNavigate } from "react-router-dom";

export const HowToPlayScreen = () => {
    const navigate = useNavigate();
    return (
        <Screen>
            <Typography sx={{ fontSize: 40, }}>
                How To Play
            </Typography>
            <Paper
                variant="purple">
                    <Typography>
                    1 - Click on any square on the board to reveal it.
                    </Typography>
                    <Typography>
                    2 - If you don't find a mine, numbers will appear indicating how many mines are hidden in the adjacent squares.
                    </Typography>
                    <Typography>
                    3 - Use the numbers to deduce where the mines are. You can right-click ro flag the squares where you think a mine could be.
                    </Typography>
                    <Typography>
                    4 - If you find a mine, the game is over. Reveal all the squares not containing a mine to win!
                    </Typography>
                    <Typography>
                    Good luck and have fun!
                    </Typography>
            </Paper>
            <Grid container>
            <Button onClick={() => navigate('/play')}>
                <Typography>
                    Go back to the Game
                </Typography>
            </Button>
            </Grid>
        </Screen>
    )
}