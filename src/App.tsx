import { useState } from "react"
import { Flags } from "./components/Flags"
import { GameContextProvider } from "./components/GameContextProvider"
import { Smiley } from "./components/Smiley"
import { Test } from "./components/Test"
import { Timer } from "./components/Timer"

function App() {
  const [start, setStart] = useState(false);
  return (
    <>
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
          <Test/>
          <Smiley/>
          <Timer/>
        </>
        }
      </GameContextProvider>
    </>
  )
}

export default App
