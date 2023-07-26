import { Button, Grid, Typography } from "@mui/material"
import { Screen } from "./Screen"
import { SettingsForm } from "./SettingsForm"
import { useNavigate } from "react-router-dom";

export const SettingsScreen = () => {
    const navigate = useNavigate();
    return (
        <Screen>
            <Grid item container justifyContent="space-between" alignItems="center">
               <Typography>
                    Settings
               </Typography>
            </Grid>
            <SettingsForm/>
            <Button onClick={() => navigate('/play')}>
               <Typography>
                    Go back to Play
               </Typography>
                </Button>
        </Screen>
    )
}