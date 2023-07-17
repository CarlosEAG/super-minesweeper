import { useGameContext } from "../hooks/useGameContext"

export const Flags = () => {
    const {gameState:{flags}} = useGameContext();
    return <div>
        FLAGS: {flags}
    </div>
}