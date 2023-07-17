import { useCallback, useMemo, useRef } from "react"

export const useSoundPool = (sources: string[]) => {
    const initialSounds = useMemo(() => {
        return sources.reduce((a,b)=>{
            return {
                ...a,
                [b]: new Audio(b),
            }
        },{});
    },[]);
    const pool = useRef<Record<string,HTMLAudioElement>>(initialSounds);
    const add = useCallback((str:string) => {
        pool.current[str] = new Audio(str);
    }, []);
    const play = useCallback((audio:string)=>{
        const audioElement = pool.current[audio]
        if(audioElement === undefined){
            throw new Error(`[useSoundPool]: No audio element was created for key=${audio}. You may have forgotten to add this source to the constructor or via the add() function.`);
        }
        if(!audioElement.paused){
            audioElement.currentTime = 0;
        }
        audioElement.play();
    },[]);
    return {
        add,
        play,
    }
}