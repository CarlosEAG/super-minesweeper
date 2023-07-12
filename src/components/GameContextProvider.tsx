import { ReactPropTypes, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useGameContext } from "../hooks/useGameContext";

interface GameContextProviderType {
    children: React.ReactNode;
}
export const GameContextProvider: React.FC<GameContextProviderType> = (props) => {
    const {children} = props;
    const {gameState} = useGameContext();
    return <GameContext.Provider value={gameState}>
        {children}
    </GameContext.Provider>
}