
import { useCallback, useEffect, useRef, useState } from "react";
import { timeReducer } from "../utils/timeReducer";

export const useTimer = () => {
    const intervalId = useRef<number | undefined>();
    const initialTime = useRef(Date.now());
    const [ellapsedTime, setEllapsedTime] = useState(0)
    const reset = useCallback(() => {
        initialTime.current = Date.now();
    },[]);
    const stop = useCallback(()=>{
        if(intervalId.current === undefined){
            throw new Error("[useTimer.stop]: Received and interval id with undefined value.");
        }
        clearInterval(intervalId.current);
        intervalId.current = undefined;
    },[]);

    const start = useCallback(()=>{
        if(intervalId.current !== undefined) {
            return;
        }
        const interval = setInterval(function(){
            setEllapsedTime(Date.now()-initialTime.current);
        }, 25);
        intervalId.current = interval;
    },[]);
    useEffect(()=>{
        start();
        return stop;
    },[]);
    const current = useCallback(()=>{
        return timeReducer(ellapsedTime);
    },[ellapsedTime]);
    return {
        current,
        reset,
        stop,
        start,
    }
}