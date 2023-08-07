import { Grid, Typography } from "@mui/material";
import { useGameContext } from "../hooks/useGameContext"

export const Flags = () => {
    const {gameState:{flags}} = useGameContext();
    return <Grid item sx={{minWidth:105}}>
        <Typography
            variant="h4"
            textAlign="end"
            sx={{textShadow: '0 0 2px #fff,0 0 10px #fff,0 0 30px #ff00ff,0 0 60px #ff00ff'}}>
            Flags: {flags}
        </Typography>
    </Grid>
}