import uncovered from "../assets/sounds/ClickSquare.wav";
import uncovered2 from "../assets/sounds/ClickSquare2.wav";
import mine from "../assets/sounds/BombExplode.wav";
import flagged from "../assets/sounds/SquareFlagged.wav";
import win from "../assets/sounds/AllSquaresCleared.wav";
import title from"../assets/sounds/TitleX2.wav";
import beginner from "../assets/sounds/Begginer.wav";
import intermediate from "../assets/sounds/Intermediate.wav";
import expert from "../assets/sounds/Expert.wav";
import custom from "../assets/sounds/Custom.wav";
import { useSoundPool } from "./useSoundPool";
import { useCallback } from "react";

export const useGameAudio = () => {
    
    const soundPool = useSoundPool([
        uncovered,
        uncovered2,
        mine,
        flagged,
        win,
        title,
        beginner,
        intermediate,
        expert,
        custom,
    ]);
    const play = useCallback((sound: string) => {
        soundPool.play(sound);
    },[]);
    return {
        playUncovered: () => play(uncovered),
        playUncoveredMany:   () => play(uncovered2),
        playFlagged:   () => play(flagged),
        playWin:   () => play(win),
        playGameover:   () => play(mine),
        playTitle: () => play(title),
        playBeginner: () => play(beginner),
        playIntermediate: () => play(intermediate),
        playExpert: () => play(expert),
        playCustom: () => play(custom),
    }
    
    
    
    
};