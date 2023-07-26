import { Grid } from "@mui/material";
import { useGameContext } from "../hooks/useGameContext";
import smiley from "../assets/images/smiley3_2.png";
import surprisey from "../assets/images/surprised.png";
import saddy from "../assets/images/sadFace.png";
import cooly from "../assets/images/cool.png";
import { useEffect, useState } from "react";
import { GAME_STATE } from "../models/GameState";

export const Smiley = () => {
    const [backgoundImage,setBackgroundImage] = useState(smiley);
    const {gameState:{state},init} = useGameContext();
    const handleClick=()=>{
        init();
        setBackgroundImage(smiley);
    }
    const handleMouseDown=()=>{
        setBackgroundImage(surprisey);
    }
    const handleMouseOut=()=>{
        if(state === GAME_STATE.INITIALIZED){
            setBackgroundImage(smiley);
        }
        
    }
    useEffect(()=>{
        if(state === GAME_STATE.GAMEOVER){
            setBackgroundImage(saddy);
        }
        if(state === GAME_STATE.WIN){
            setBackgroundImage(cooly);
        }
    },[state])
    return <Grid item 
    sx={{width:50,height:50,backgroundImage:`url(${backgoundImage})`, backgroundSize:"cover"}}
    onClick={handleClick}
    onMouseDown={handleMouseDown}
    onMouseOut={handleMouseOut}
    />
}