import { useEffect, useLayoutEffect, useState } from "react";

const getWindowSize = () => {
    const {innerWidth: width, innerHeight:height} = window;
    return {width, height};
}

export const useWindowSize = () => {
    const [size, setSize] = useState(getWindowSize());

    useLayoutEffect(()=>{
        const handleResize = () => {
            setSize(getWindowSize());
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    },[]);

    return size;
}

