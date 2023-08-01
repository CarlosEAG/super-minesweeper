import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { LightBanner } from "./LightBanner";
import { useNavigate } from "react-router-dom";
import { TitleHeader } from "./TitleHeader";
import { Grid, Typography } from "@mui/material";
import Button from "./Custom/Button";

export const Title = () => {
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
        return (
        <Grid container justifyContent="center" alignItems="center" sx={{position:'absolute', left: 0, width: '100%', height:'100%',}}>
            <Button size="large" variant="outlined" sx={{
                boxShadow: "0 0 1px #fff, 0 0 10px #3399ff, 0 0 3px #3399ff",
                }}
                initial={{
                    opacity:0
                }}
                animate={{
                    opacity:1
                }}
                whileHover={{
                    scale:1.2
                }}
                whileTap={{
                    scale:0.5,
                    opacity:0,
                    transition:{
                        //type:'spring'
                    }
                }}
                onClick={()=>setStart(true)}>
                <Typography variant="h3"
                sx={{
                    color: '#fff',
                }}
                >
                    Start!
                </Typography>
            </Button>
        </Grid>
        )
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