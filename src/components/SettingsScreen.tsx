import { Grid, Typography } from "@mui/material"
import  Screen from "./Screen"
import { SettingsForm } from "./SettingsForm"

export const SettingsScreen = () => {

    return (
        <Screen
        initial={{
            scale:0,
        }}
        animate={{
            scale:1,
        }}
        transition={{
            type:'spring',
            duration: 0.335,
            delay: 0,
        }}

        >
            <Grid item container justifyContent="space-between" alignItems="center">
               <Typography>
                    Settings
               </Typography>
            </Grid>
            <SettingsForm/>
        </Screen>
    )
}