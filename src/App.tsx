import { useState } from "react"
import { Flags } from "./components/Flags"
import { GameContextProvider } from "./components/GameContextProvider"
import { Smiley } from "./components/Smiley"
import { Board } from "./components/Board"
import { Timer } from "./components/Timer"
import { ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  spacing: 3,
});

function App() {
  const [start, setStart] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div>
        Super Minesweeper Ultra HD Turbo!
      </div>
      <GameContextProvider>
        {!start 
        ? <div onClick={()=>setStart(true)}>
            Start!
          </div>
        :<>
          <Flags/>
          <Board/>
          <Smiley/>
          <Timer/>
        </>
        }
      </GameContextProvider>
    </ThemeProvider>
  )
}

export default App
