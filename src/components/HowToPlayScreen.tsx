import { Grid, Typography } from "@mui/material"
import Screen from "./Screen"

export const HowToPlayScreen = () => {

    return (
        <Screen>
            <Grid item container justifyContent="space-between" alignItems="center">
               <Typography>
                    How To Play
               </Typography>
            </Grid>
            You have to trust in the heart of the squares
        </Screen>
    )
}