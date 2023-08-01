import { useCallback, useReducer } from "react";
import { GameStateReducer } from "./../reducers/GameStateReducer";
import { initialGameState } from "./../utils/initialState";
import { GAME_STATE_ACTION } from "../models/GameAction";
import { Cell, CellID } from "../models/Cell";
import { useTimer } from "./useTimer";
import { useGameAudio } from "./useGameAudio";
import { difficulty } from "../models/Settings";
import { BoardDimensions } from "../models/BoardDimensions";

export const useGameReducer = () => {

    const [gameState, dispatch] = useReducer(GameStateReducer,initialGameState);
    const time = useTimer();
    const audio = useGameAudio();
    const init = useCallback(() => {
        time.reset();
        time.start();
        dispatch({type: GAME_STATE_ACTION.INITIALIZE});
    },[]);

    const setMines = useCallback((clickedCellId: CellID)=>{
        dispatch({type:GAME_STATE_ACTION.PLACE_MINES, payload: {clickedCellId}});
    },[]);

    const uncover = useCallback((clickedCellId: CellID)=>{
        dispatch({type:GAME_STATE_ACTION.UNCOVER_CELLS, payload: {clickedCellId}});
    },[]);

    const updateCell = useCallback(<T extends keyof Cell>(id: CellID, property:T, value: Cell[T])=>{
        dispatch ({type: GAME_STATE_ACTION.UPDATE_CELL, payload: {id, property, value}});
    },[]);

    const setGameOver = useCallback(()=>{
        time.stop();
        dispatch({type: GAME_STATE_ACTION.GAME_OVER});
    },[]);

    const setWin = useCallback(()=>{
        time.stop();
        dispatch({type: GAME_STATE_ACTION.WIN});
    },[]);

    const setBoardSize = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.SIZE_UPDATE});
    },[]);

    const setDifficulty = useCallback((difficulty: difficulty, customConfig?: {size:BoardDimensions, mines:number})=>{
        dispatch({type: GAME_STATE_ACTION.DIFFICULTY_UPDATE, payload:{difficulty, customConfig}});
    },[]);

    const getCell = (id:CellID): Cell => {
        return gameState.board.cells[id-1];
    };

    const cycleCell = (clickedCellId: CellID) => {
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
        audio,
    }
}

export type GameReducerType = ReturnType<typeof useGameReducer>
