import { useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { GAME_STATE } from "../models/GameState";

export const useGameCycle = () => {
    const {
        gameState: { state, cellsLeft, lastAmountUncovered, settings: { mines } },
        init,
        setWin,
        audio,
    } = useGameContext();
    useEffect(() => {
        audio.playTitle();
        init();
    }, []);

    useEffect(() => {
        if (state === GAME_STATE.GAMEOVER) {
            audio.playGameover();
            return;
        }
        if (state === GAME_STATE.WIN) {
            audio.playWin();
            return;
        }
        if (cellsLeft === mines) {
            setWin();
            return;
        }
        if (lastAmountUncovered === 0) {
            return;
        }
        if (lastAmountUncovered > 10) {
            audio.playUncoveredMany();
        } else {
            audio.playUncovered();
        }

    }, [cellsLeft, state]);
}