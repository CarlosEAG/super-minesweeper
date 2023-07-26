import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { LightBanner } from "./LightBanner";
import { useNavigate } from "react-router-dom";
import { TitleHeader } from "./TitleHeader";

export interface TitleProps {
    onAnimationComplete?: () => void;
}
export const Title = ({onAnimationComplete}:TitleProps) => {
    const {audio} = useGameContext();
    const windowSize = useWindowSize();
    const navigate = useNavigate();
    const fullTitleRef = useRef<HTMLDivElement>(null);
    const [variant, setVariant] = useState('center');
    const [start, setStart] = useState(false);
    const speedFactor = 1;
    useEffect(()=>{
        audio.playTitle();
    },[start]);

    if(!start){
        return <div onClick={()=>setStart(true)}>
        Start!
      </div>
    }
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
                    duration: 6.335*speedFactor,
                    onComplete: () => setVariant("top"),
                },
            },
            top: {
                y: 0,
                transition:{
                    type: 'spring',
                    onComplete: ()=>navigate('/play'),
                },
            }
        }}
        animate={variant}
        >
            <TitleHeader />
        </motion.div>
        <LightBanner
        text={{
            top: 'Super Minesweeper Ultra HD Turbo! Charged Remix IV',
            bottom:'Deluxe Collector\'s Fancy Reloaded Edition Plus'
        }}/>
        </>
    );
}