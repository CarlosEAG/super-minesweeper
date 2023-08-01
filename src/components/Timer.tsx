import { Grid, Typography } from "@mui/material";
import { useGameContext } from "../hooks/useGameContext";

export const Timer = () => {
    const {time} = useGameContext();
    const [,,minutes,seconds,milliseconds] = time.current();
    const timeStr = 
    `${minutes <10 ? '0' : ''}${minutes}:`
    + `${seconds <10 ? '0' : ''}${seconds}:`
    + `${milliseconds <10 ? '0' : ''}${milliseconds/10 >> 0}`
    return <Grid item sx={{minWidth:105}}>
    <Typography 
        variant="h4"
        sx={{textShadow: '0 0 10px #fff, 0 0 30px #00ffcc, 0 0 60px #00ffcc'}}>
        {timeStr}
    </Typography>
    
</Grid>
}