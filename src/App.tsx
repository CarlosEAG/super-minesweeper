import { GameContextProvider } from "./components/GameContextProvider"
import { Test } from "./components/Test"

function App() {
  return (
    <>
      <div>
        Super Minesweeper Ultra HD Turbo!
      </div>
      <GameContextProvider>
        <Test/>
      </GameContextProvider>
    </>
  )
}

export default App
