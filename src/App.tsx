import { GameContextProvider } from "./components/GameContextProvider"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, ThemeProvider, createTheme } from "@mui/material"
import Teko from "./assets/fonts/Teko-Regular.ttf"
import { Dial } from "./components/Dial"
import { GameScreen } from "./components/GameScreen"
import { SettingsScreen } from "./components/SettingsScreen"
import { Title } from "./components/Title"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { TitleHeader } from "./components/TitleHeader"
import { HowToPlayScreen } from "./components/HowToPlayScreen"

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container>
      <GameContextProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Title />} />
          <Route path='/*' element={<Dial/>}/>
        </Routes>
        <Routes>
          <Route element={<TitleHeader />} >
            <Route path='play' element={<GameScreen />} />
            <Route path='settings' element={<SettingsScreen />} />
            <Route path='howTo' element={<HowToPlayScreen />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </GameContextProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
