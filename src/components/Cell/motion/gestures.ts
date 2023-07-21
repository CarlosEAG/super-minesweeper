import { Variant } from "framer-motion";

export const gestures: Record<string,Variant> = {
    whileHover: {
        scale:[1.15, 1.1],
        opacity: [0.5,1],
        transition:{
            type:'spring',
        },  
    },
    whileTap:{
        scale:0.95,
        transition:{
            duration:0.01,
            type:'spring',
        },
    },
};