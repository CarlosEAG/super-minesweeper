import { useState } from "react"
import { Flags } from "./components/Flags"
import { GameContextProvider } from "./components/GameContextProvider"
import { Smiley } from "./components/Smiley"
import { Board } from "./components/Board"
import { Timer } from "./components/Timer"
import { Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material"
import Teko from "./assets/fonts/Teko-Regular.ttf"
const theme = createTheme({
  spacing: 3,
  palette: {
    background: {
      default: "#000",
    },
    text:{
      primary: "#fff",
    }
  },
  //*
  typography: {
    fontFamily: "Teko",
  },//*/
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Teko';
          src: url(${Teko}) format('truetype');
        }
      `,
    },
  },
});

function App() {
  const [start, setStart] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container>
      <Typography textAlign="center" sx={{
        textShadow: "0px 0px 10px #fff, 0px 0px 30px #ff339c, 0px 0px 60px #ff339c",
        typography: { xs: 'h5', sm: 'h3', md: 'h2' }
        }}>
        Super Minesweeper Ultra HD Turbo! Charged Remix IV
      </Typography>
      <Typography textAlign="center"  sx={{
        textShadow: "0px 0px 10px #fff, 0px 0px 30px #3399ff, 0px 0px 60px #3399ff",
        typography: { xs: 'h6', sm: 'h4', md: 'h3' }
        }}>
      Deluxe Collector's Fancy Reloaded Edition Plus
      </Typography>
      <GameContextProvider>
        {!start 
        ? <div onClick={()=>setStart(true)}>
            Start!
          </div>
        :<>
        <Grid container justifyContent="center">
          <Grid item container  sx={{ display: 'grid', width: 'fit-content' }}>
            <Grid item container justifyContent="space-between" alignItems="center">
              <Timer/>
              <Smiley/>
              <Flags/>
            </Grid>
            <Board/>
          </Grid>
        </Grid>
        </>
        }
      </GameContextProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
