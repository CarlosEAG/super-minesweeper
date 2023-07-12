import { ReactPropTypes, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useGameContext } from "../hooks/useGameContext";

interface GameContextProviderType {
    children: React.ReactNode;
}
export const GameContextProvider: React.FC<GameContextProviderType> = (props) => {
    const {children} = props;
    return <GameContext.Provider value={useGameContext()}>
        {children}
    </GameContext.Provider>
}