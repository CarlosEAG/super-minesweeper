import { RefObject, useEffect, useRef, useState } from "react";

type size = {
    width: number;
    height: number;
}
export const useElementSize = <T extends HTMLElement>(): [RefObject<T>,size] => {
    const elementRef = useRef<T>(null);
    const [size,setSize] = useState({width:0,height:0});
    useEffect(()=>{
        const newSize = {
            width: elementRef.current?.clientWidth ?? 0,
            height: elementRef.current?.clientHeight ?? 0,
        };
        setSize(newSize);
    }, [elementRef]);
    return [elementRef, size];
}