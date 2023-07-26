import { Grid, Typography } from "@mui/material"
import { Screen } from "./Screen"
import Paper from "./Custom/Paper"

export const HowToPlayScreen = () => {

    return (
        <Screen>
            <Typography sx={{ fontSize: 40, }}>
                How To Play
            </Typography>
            <Paper
                variant="purple">
                You have to trust in the heart of the squares
            </Paper>
        </Screen>
    )
}