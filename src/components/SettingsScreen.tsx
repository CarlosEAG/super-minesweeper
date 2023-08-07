import { Button, Grid, Typography } from "@mui/material"
import { Screen } from "./Screen"
import { SettingsForm } from "./SettingsForm"
import { useNavigate } from "react-router-dom";

export const SettingsScreen = () => {
    const navigate = useNavigate();
    return (
        <Screen>
            <Typography  sx={{ fontSize: 40, }}>
                Settings
            </Typography>
            <SettingsForm />
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