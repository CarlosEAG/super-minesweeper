import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import MotionGrid from "./Custom/Grid";

interface ScreenType {
    children: React.ReactNode,
    onAnimationComplete?: ()=>void,
}

export const Screen = ({children, onAnimationComplete}: ScreenType)=>{
    return (
        <MotionGrid container justifyContent="center"
            initial={{
                scale:0,
            }}
            animate={{
                scale:1,
            }}
            transition={{
                type:'spring',
                duration: 0.335,
            }}
            onAnimationComplete={onAnimationComplete}
        >
            <Grid item container  sx={{ display: 'grid', width: 'fit-content' }}>
                {children}
            </Grid>
        </MotionGrid>
    )
};