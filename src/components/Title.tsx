import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useLayoutEffect, useRef, useState } from "react";

         const factor = 32;
         const ts = {
            h5: factor*0.83,
            h3: factor*1.17,
            h2: factor*1.5,
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
export const Title = () => {
    const windowSize = useWindowSize();
    
    const title2Ref = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLDivElement>(null);
    const fullTitleRef = useRef<HTMLDivElement>(null);

    const [variant, setVariant] = useState('');
    const [variant2, setVariant2] = useState('');
    const [variant3, setVariant3] = useState('');
    useLayoutEffect(()=>{
        if(fullTitleRef.current && title1Ref.current && title2Ref.current){
            setVariant("center");
            setVariant2("right");
            setVariant3("left");
        }
    },[fullTitleRef,title1Ref,title2Ref]);
    return (
        <>
        <motion.div
        ref={fullTitleRef}
        variants={{
            center: {
                y:windowSize.height/2 - (fullTitleRef.current?.clientHeight ?? 0)/2,
                scale:0,
                opacity:0,
                transition:{
                    duration: 0,
                    onComplete: () => setVariant("grow"),
                },
                
            },
            grow: {
                y:windowSize.height/2 - (fullTitleRef.current?.clientHeight ?? 0)/2,
                scale:1,
                opacity:1,
                transition:{
                    duration: 7,
                    onComplete: () => setVariant("top"),
                },
                
            },
            top: {
                y: 0,
            }
        }}
        animate={variant}
        >
            <Typography textAlign="center" sx={{
                zIndex:-1000,
            textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
            typography: { xs: 'h5', sm: 'h3', md: 'h2' },
        }}>
            Super Minesweeper Ultra HD Turbo! Charged Remix IV
        </Typography><Typography textAlign="center" sx={{
            zIndex:-1000,
            textShadow: "0 0 10px #fff, 0 0 30px #3399ff, 0 0 3px #3399ff",
            typography: { xs: 'h6', sm: 'h4', md: 'h3' }
        }}>
                Deluxe Collector's Fancy Reloaded Edition Plus
            </Typography>
        </motion.div>
        <ThemeProvider theme={theme}>

        <motion.div
        style={{width:'fit-content', position:'absolute', top: 0,}}
        ref={title1Ref}
        variants={{
            right: {
                opacity: 1,
                x: windowSize.width,
                y:-(title1Ref.current?.clientHeight ?? 0)/3,
                transition:{
                    duration: 0,
                    onComplete: () => setVariant2("left"),
                }
            },
            left: {
                opacity:0,
                x: -(title1Ref.current?.clientWidth ?? 0),
                y:-(title1Ref.current?.clientHeight ?? 0)/3,
                transition:{
                    type:'linear',
                    duration:9,
                }
            }
        }}
        animate={variant2}
        >
            <Typography textAlign="center" sx={{
                zIndex:-1000,
            //textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
            typography: { xs: 'h5', sm: 'h3', md: 'h2' },
            textWrap: 'nowrap',
        }}>
            Super Minesweeper Ultra HD Turbo! Charged Remix IV
        </Typography>
        </motion.div>

        <motion.div
        style={{width:'fit-content', position:'absolute', top: 0,}}
        ref={title2Ref}
        variants={{
            left: {
                opacity: 1,
                x: -(title2Ref.current?.clientWidth ?? 0),
                y: windowSize.height-(title2Ref.current?.clientHeight ?? 0)*2/3,
                transition:{
                    duration: 0,
                    onComplete: () => setVariant3("right"),
                }
            },
            right: {
                opacity:0,
                x: windowSize.width,
                y: windowSize.height-(title2Ref.current?.clientHeight ?? 0)*2/3,
                transition:{
                    type:'linear',
                    duration:9,
                }
            }
        }}
        animate={variant3}
        >
            <Typography textAlign="center" sx={{
                zIndex:-1000,
            //textShadow: "0px 0px 10px #fff, 0px 0px 30px #3399ff, 0px 0px 60px #3399ff",
            typography: { xs: 'h5', sm: 'h3', md: 'h2' },
            textWrap:'nowrap',
        }}>
                Deluxe Collector's Fancy Reloaded Edition Plus
            </Typography>
        </motion.div>
        </ThemeProvider>
        </>
    );
}