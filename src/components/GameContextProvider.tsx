import { ReactPropTypes, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useGameReducer } from "../hooks/useGameReducer";

interface GameContextProviderType {
    children: React.ReactNode;
}
export const GameContextProvider: React.FC<GameContextProviderType> = (props) => {
    const {children} = props;
    return <GameContext.Provider value={useGameReducer()}>
        {children}
    </GameContext.Provider>
}