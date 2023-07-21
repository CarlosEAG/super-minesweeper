import { Grid, Typography } from "@mui/material";
import { useGameContext } from "../hooks/useGameContext"

export const Flags = () => {
    const {gameState:{flags}} = useGameContext();
    return <Grid item sx={{minWidth:105}}>
        <Typography variant="h4" textAlign="end">
            Flags: {flags}
        </Typography>
    </Grid>
}