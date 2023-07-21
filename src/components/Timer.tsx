import { Grid, Typography } from "@mui/material";
import { useGameContext } from "../hooks/useGameContext";

export const Timer = () => {
    const {time:{minutes, seconds, milliseconds}} = useGameContext();
    const timeStr = 
    `${minutes <10 ? '0' : ''}${minutes}:`
    + `${seconds <10 ? '0' : ''}${seconds}:`
    + `${milliseconds <10 ? '0' : ''}${milliseconds/10 >> 0}`
    return <Grid item sx={{minWidth:105}}>
    <Typography variant="h4">
        {timeStr}
    </Typography>
    
</Grid>
}