import { useCallback, useRef } from "react";

export const useSound = (source: string) => {
    const sound = useRef(new Audio(source));
    const play = useCallback(() => {
        if(!sound.current.paused){
            sound.current.currentTime = 0;
        }
        sound.current.play();
    },[]);
    return {play};
};