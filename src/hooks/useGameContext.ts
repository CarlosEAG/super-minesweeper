import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const useGameContext = () => {
    const gameContext = useContext(GameContext);
    return gameContext;
}