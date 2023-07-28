import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { useWindowSize } from "../hooks/useWindowSize";
import MotionBox from "./Custom/Box";
import { useElementSize } from "../hooks/useElementSize";

const factor = 32;
const ts = {
    h5: factor * 0.83,
    h3: factor * 1.17,
    h2: factor * 1.5,
}
const theme = createTheme({
    typography: {
        fontFamily: "Teko",
        h5: {
            fontSize: `${ts.h5}em`, // 24px
        },
        h3: {
            fontSize: `${ts.h5}em`, // 18.72px
        },
        h2: {
            fontSize: `${ts.h5}em`, // 13.28px
        },
    },
});

const colorVariants = {
    white: '#fff',
    red: '#ff0079',
    green: '#00ffa7',
    cyan: '#2ee8ed',
}

type color = keyof typeof colorVariants;

type textKeys = 'top' | 'bottom';
export interface LightBannerProps {
    text: string | Record<textKeys, string>;
    color?: color;
    loop?: boolean;
}
export const LightBanner = ({ text, loop = false, color= 'white' }: LightBannerProps) => {
    const windowSize = useWindowSize();
    const [title1Ref,title1Size] = useElementSize<HTMLDivElement>();
    const [title2Ref,title2Size] = useElementSize<HTMLDivElement>();
    const speedFactor = 1;
    return ( 
        <>
            <ThemeProvider theme={theme}>
                <MotionBox
                    ref={title1Ref}
                    sx={{ 
                        zIndex:-1000,
                        width: 'fit-content',
                        position: 'absolute',
                        top: -title1Size.height / 3,
                        left: windowSize.width,
                    }}
                    initial={{
                        opacity: 1,
                    }}
                    animate={{
                        opacity: 0,
                        x: -windowSize.width-(title1Size.width ?? 0),
                    }}
                    transition={{ease: loop ? 'linear' : 'easeOut', repeat: loop ? Infinity : 0, duration: 9 * speedFactor}}
                >
                    <Typography textAlign="center" sx={{
                        zIndex: -1000,
                        //textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
                        typography: { xs: 'h5', sm: 'h3', md: 'h2' },
                        textWrap: 'nowrap',
                        color:colorVariants[color],
                    }}>
                        {typeof text === 'string' ? text : text.top}
                    </Typography>
                </MotionBox>
                <MotionBox
                    sx={{ 
                        width: 'fit-content', 
                        position: 'absolute', 
                        top: windowSize.height - (title2Size.height ?? 0) * 2 / 3,
                        left: -title2Size.width,
                    }}
                    ref={title2Ref}
                    initial={{
                        opacity: 1,
                    }}
                    animate={{
                        opacity: 0,
                        x: windowSize.width+title2Size.width,
                    }}
                    transition={{ease: loop ? 'linear' : 'easeOut', repeat: loop ? Infinity : 0, duration: 9 * speedFactor, }}
                >
                    <Typography textAlign="center" sx={{
                        zIndex: -1000,
                        //textShadow: "0px 0px 10px #fff, 0px 0px 30px #3399ff, 0px 0px 60px #3399ff",
                        typography: { xs: 'h5', sm: 'h3', md: 'h2' },
                        textWrap: 'nowrap',
                        color:colorVariants[color],
                    }}>
                        {typeof text === 'string' ? text : text.bottom}
                    </Typography>
                </MotionBox>
            </ThemeProvider>
        </>
    );
}