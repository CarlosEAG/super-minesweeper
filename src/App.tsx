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

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    blue: true;
    purple: true;
    main: true;
  }
}

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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#ff0079",
          color: "white",
          fontSize:20,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root:{
          color: 'white',
          textShadow: '0 0 30px #fff',
          '&.Mui-checked':{
            color: '#1616c7', //'cyan',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "white",
          },
          "& label.Mui-disabled": {
            color: "#2f4c6d !important",
          },
          "& label.Mui-error": {
            color: "#cf0e9b",
          },
          "& .MuiFormHelperText-root.Mui-error":{
            color: '#cf0e9b',
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#80bacf",
            },
            "&:hover fieldset": {
              //borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              //borderColor: "darkblue",
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#2f4c6d !important",
              color: '#2f4c6d !important',
            },
            "&.Mui-error fieldset": {
              borderColor: "#cf0e9b",
              color: '#cf0e9b',
            },
          },
        },
      },
    },
      MuiPaper: {
        variants: [
          {
            props: { variant: 'main' },
            style: ({theme})=>({
              backgroundColor: 'blue',
              boxShadow: '0px 0px 2px #fff, 0px 0px 10px #990099,0px 0px 15px #990099',
              //boxShadow: '0px 0px 10px #fff,0px 0px 30px blue,0px 0px 60px blue,0px 0px 30px blue,0px 0px 60px blue',
              color: 'white',
              padding: theme.spacing(1.5),
            }),
          },
          {
            props: { variant: 'blue' },
            style: ({theme}) => ({
              padding: theme.spacing(3),
              backgroundColor: '#1c1c38', //'#2222fb',
              boxShadow: '0px 0px 2px #fff, 0px 0px 10px blue,0px 0px 15px blue',
              //boxShadow: '0px 0px 10px #fff,0px 0px 30px blue,0px 0px 60px blue,0px 0px 30px blue,0px 0px 60px blue',
              color: 'white',
            }),
          },
          {
            props: { variant: 'purple' },
            style: ({theme}) => ({
              padding: theme.spacing(3),
              backgroundColor: 'purple',
              boxShadow: '0px 0px 2px #fff, 0px 0px 10px purple,0px 0px 15px purple',
              //boxShadow: '0px 0px 10px #fff,0px 0px 30px purple,0px 0px 60px purple,0px 0px 30px purple,0px 0px 60px purple',
              color: 'white',
            }),
          },
        ],
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
