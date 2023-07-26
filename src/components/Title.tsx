import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useLayoutEffect, useRef, useState } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { LightBanner } from "./LightBanner";

export interface TitleProps {
    onAnimationComplete?: () => void;
}
export const Title = ({onAnimationComplete}:TitleProps) => {
    const {audio} = useGameContext();
    const windowSize = useWindowSize();
    const fullTitleRef = useRef<HTMLDivElement>(null);
    const [variant, setVariant] = useState('');
    const speedFactor = 1;
    useLayoutEffect(()=>{
        if(fullTitleRef.current){
            setVariant("center");
            audio.playTitle();
        }
    },[fullTitleRef]);
    return (
        <>
        <motion.div
        ref={fullTitleRef}
        variants={{
            center: {
                y:windowSize.height/2 - (fullTitleRef.current?.clientHeight ?? 0)/2,
                scale:0,
                opacity:0,
                transition:{
                    duration: 0,
                    onComplete: () => setVariant("grow"),
                },
            },
            grow: {
                y:windowSize.height/2 - (fullTitleRef.current?.clientHeight ?? 0)/2,
                scale:1,
                opacity:1,
                transition:{
                    duration: 7*speedFactor,
                    onComplete: () => setVariant("top"),
                },
            },
            top: {
                y: 0,
                transition:{
                    type: 'spring',
                    onComplete: onAnimationComplete,
                },
            }
        }}
        animate={variant}
        >
            <Typography textAlign="center" sx={{
                zIndex:-1000,
            textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
            typography: { xs: 'h5', sm: 'h3', md: 'h2' },
        }}>
            Super Minesweeper Ultra HD Turbo! Charged Remix IV
        </Typography><Typography textAlign="center" sx={{
            zIndex:-1000,
            textShadow: "0 0 10px #fff, 0 0 30px #3399ff, 0 0 3px #3399ff",
            typography: { xs: 'h6', sm: 'h4', md: 'h3' }
        }}>
                Deluxe Collector's Fancy Reloaded Edition Plus
            </Typography>
        </motion.div>
        <LightBanner
        text={{
            top: 'Super Minesweeper Ultra HD Turbo! Charged Remix IV',
            bottom:'Deluxe Collector\'s Fancy Reloaded Edition Plus'
        }}/>
        </>
    );
}