import { Variant } from "framer-motion";

export const variants: Record<string,Variant> = {
    initial: { 
        opacity: 1,
        scale: 1,
    },
    uncovered: {
        opacity: 1,
        rotate: 0,
        scale: [0.8, 1.5, 1],
        transition: {
            duration: 0.2,
        }
    },
  };

  export type cellVariant = keyof typeof variants;
