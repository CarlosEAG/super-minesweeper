import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useLayoutEffect, useRef, useState } from "react";

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

type textKeys = 'top' | 'bottom';
export interface LightBannerProps {
    text: string | Record<textKeys, string>;
}
export const LightBanner = ({ text }: LightBannerProps) => {
    const windowSize = useWindowSize();
    const title2Ref = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLDivElement>(null);
    const [variant2, setVariant2] = useState('');
    const [variant3, setVariant3] = useState('');
    const speedFactor = 1;
    useLayoutEffect(() => {
        if (title1Ref.current && title2Ref.current) {
            setVariant2("right");
            setVariant3("left");
        }
    }, [title1Ref, title2Ref]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <motion.div
                    style={{ width: 'fit-content', position: 'absolute', top: 0, }}
                    ref={title1Ref}
                    variants={{
                        right: {
                            opacity: 1,
                            x: windowSize.width,
                            y: -(title1Ref.current?.clientHeight ?? 0) / 3,
                            transition: {
                                duration: 0,
                                onComplete: () => setVariant2("left"),
                            }
                        },
                        left: {
                            opacity: 0,
                            x: -(title1Ref.current?.clientWidth ?? 0),
                            y: -(title1Ref.current?.clientHeight ?? 0) / 3,
                            transition: {
                                type: 'linear',
                                duration: 9 * speedFactor,
                            }
                        }
                    }}
                    animate={variant2}
                >
                    <Typography textAlign="center" sx={{
                        zIndex: -1000,
                        //textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
                        typography: { xs: 'h5', sm: 'h3', md: 'h2' },
                        textWrap: 'nowrap',
                    }}>
                        {typeof text === 'string' ? text : text.top}
                    </Typography>
                </motion.div>
                <motion.div
                    style={{ width: 'fit-content', position: 'absolute', top: 0, }}
                    ref={title2Ref}
                    variants={{
                        left: {
                            opacity: 1,
                            x: -(title2Ref.current?.clientWidth ?? 0),
                            y: windowSize.height - (title2Ref.current?.clientHeight ?? 0) * 2 / 3,
                            transition: {
                                duration: 0,
                                onComplete: () => setVariant3("right"),
                            }
                        },
                        right: {
                            opacity: 0,
                            x: windowSize.width,
                            y: windowSize.height - (title2Ref.current?.clientHeight ?? 0) * 2 / 3,
                            transition: {
                                type: 'linear',
                                duration: 9 * speedFactor,
                            }
                        }
                    }}
                    animate={variant3}
                >
                    <Typography textAlign="center" sx={{
                        zIndex: -1000,
                        //textShadow: "0px 0px 10px #fff, 0px 0px 30px #3399ff, 0px 0px 60px #3399ff",
                        typography: { xs: 'h5', sm: 'h3', md: 'h2' },
                        textWrap: 'nowrap',
                    }}>
                        {typeof text === 'string' ? text : text.bottom}
                    </Typography>
                </motion.div>
            </ThemeProvider>
        </>
    );
}