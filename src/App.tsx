import { GameContextProvider } from "./components/GameContextProvider"
import { Smiley } from "./components/Smiley"
import { Test } from "./components/Test"
import { Timer } from "./components/Timer"

function App() {
  return (
    <>
      <div>
        Super Minesweeper Ultra HD Turbo!
      </div>
      <GameContextProvider>
        <Test/>
        <Smiley/>
        <Timer/>
      </GameContextProvider>
    </>
  )
}

export default App
