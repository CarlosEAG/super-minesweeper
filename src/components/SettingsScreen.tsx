import { Button, Grid, Typography } from "@mui/material"
import { Screen } from "./Screen"
import { SettingsForm } from "./SettingsForm"
import { useNavigate } from "react-router-dom";

export const SettingsScreen = () => {
    const navigate = useNavigate();
    return (
        <Screen>
            <Typography>
                Settings
            </Typography>
            <SettingsForm />
            <Button onClick={() => navigate('/play')}>
                <Typography>
                    Go back to Play
                </Typography>
            </Button>
        </Screen>
    )
}