import { useCallback, useReducer } from "react";
import { GameStateReducer } from "./../reducers/GameStateReducer";
import { initialGameState } from "./../utils/initialState";
import { GAME_STATE_ACTION } from "../models/GameAction";
import { Cell, CellID } from "../models/Cell";
import { useTimer } from "./useTimer";
import { useSound } from "./useSound";
import uncovered from "../assets/sounds/ClickSquare.wav";
import uncovered2 from "../assets/sounds/ClickSquare2.wav";
import mine from "../assets/sounds/BombExplode.wav";
import flagged from "../assets/sounds/SquareFlagged.wav";
import win from "../assets/sounds/AllSquaresCleared.wav";
import { useSoundPool } from "./useSoundPool";

export const useGameReducer = () => {

    const [gameState, dispatch] = useReducer(GameStateReducer,initialGameState);
    const time = useTimer();
    const uncoverSound = useSound(uncovered);
    const uncoverManySound = useSound(uncovered2);
    const flagSound = useSound(flagged);
    const winSound = useSound(win);
    const gameOverSound = useSound(mine);
    const soundPool = useSoundPool([
        uncovered,
        mine,
        flagged,
        win
    ]);
    /*
    const uncoverSound = useSound(aud);
    const mineFound = useSound(mine);
    const flag = useSound(flagged);
    //*/
    const init = useCallback(() => {
        time.reset();
        time.start();
        dispatch({type: GAME_STATE_ACTION.INITIALIZE});
    },[]);

    const setMines = useCallback((clickedCellId: CellID)=>{
        dispatch({type:GAME_STATE_ACTION.PLACE_MINES, payload: {clickedCellId}});
    },[]);

    const uncover = useCallback((clickedCellId: CellID)=>{
        debugger;
        //soundPool.play(uncovered);
        dispatch({type:GAME_STATE_ACTION.UNCOVER_CELLS, payload: {clickedCellId}});
    },[]);

    const updateCell = useCallback(<T extends keyof Cell>(id: CellID, property:T, value: Cell[T])=>{
        dispatch ({type: GAME_STATE_ACTION.UPDATE_CELL, payload: {id, property, value}});
    },[]);

    const setGameOver = useCallback(()=>{
        time.stop();
        //soundPool.play(mine);
        dispatch({type: GAME_STATE_ACTION.GAME_OVER});
    },[]);

    const setWin = useCallback(()=>{
        time.stop();
        //soundPool.play(win);
        dispatch({type: GAME_STATE_ACTION.WIN});
    },[]);

    const setBoardSize = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.SIZE_UPDATE});
    },[]);

    const setDifficulty = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.DIFFICULTY_UPDATE});
    },[]);

    const getCell = (id:CellID): Cell => {
        return gameState.board.cells[id-1];
    };

    const cycleCell = (clickedCellId: CellID) => {
        //soundPool.play(flagged);
        return dispatch({type: GAME_STATE_ACTION.CYCLE_CELL, payload: {clickedCellId}})
    }

    return {
        gameState,
        init,
        setMines,
        uncover,
        updateCell,
        setGameOver,
        setWin,
        setBoardSize,
        setDifficulty,
        getCell,
        cycleCell,
        time,

        uncoverSound,
        uncoverManySound,
        flagSound,
        winSound,
        gameOverSound,
    }
}

export type GameReducerType = ReturnType<typeof useGameReducer>
