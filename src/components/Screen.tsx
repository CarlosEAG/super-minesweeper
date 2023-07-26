import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface ScreenType {
    children: React.ReactNode,
}

export const Screen = React.forwardRef<HTMLDivElement, ScreenType>((props, ref)=>{
    return (
        <Grid container justifyContent="center" ref={ref}>
            <Grid item container  sx={{ display: 'grid', width: 'fit-content' }}>
                {props.children}
            </Grid>
        </Grid>
    )
});

const MotionScreen = motion(Screen);

export default MotionScreen;
