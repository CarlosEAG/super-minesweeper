import { useState } from "react"
import { GameContextProvider } from "./components/GameContextProvider"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, ThemeProvider, createTheme } from "@mui/material"
import Teko from "./assets/fonts/Teko-Regular.ttf"
import { Dial } from "./components/Dial"
import { GameScreen } from "./components/GameScreen"
import { SettingsScreen } from "./components/SettingsScreen"
import { Title } from "./components/Title"

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
        body {
          overflow: hidden;
        }
       },
      `,
    },
  },
});

function App() {
  const [start, setStart] = useState(false);
  const [titleSequenceEnded, setTitleSequenceEnded] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container>
      <GameContextProvider>
        {!start 
        ? <div onClick={()=>setStart(true)}>
            Start!
          </div>
        :<>
        <Title onAnimationComplete={()=>setTitleSequenceEnded(true)}/>
        {titleSequenceEnded && <GameScreen/>}
        </>
        }
        <Dial/>
      </GameContextProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
