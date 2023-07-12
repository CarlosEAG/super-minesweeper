import { useCallback, useReducer } from "react";
import { GameStateReducer } from "./../reducers/GameStateReducer";
import { initialGameState } from "./../utils/initialState";
import { GAME_STATE_ACTION } from "../models/GameAction";
import { Cell, CellID } from "../models/Cell";


export const useGameContext = () => {

    const [gameState, dispatch] = useReducer(GameStateReducer,initialGameState);

    const init = useCallback(() => {
        //const newBoard = generateBoard(gameState.settings.size);
        dispatch({type: GAME_STATE_ACTION.INITIALIZE});
    },[]);

    const setMines = useCallback((clickedCellId: CellID)=>{
        //const newBoard = placeMines(gameState.board, gameState.settings.mines);
        dispatch({type:GAME_STATE_ACTION.PLACE_MINES, payload: {clickedCellId}});
    },[]);

    const uncover = useCallback((clickedCellId: CellID)=>{
        //const newBoard = uncoverCells(gameState, id);
        dispatch({type:GAME_STATE_ACTION.UNCOVER_CELLS, payload: {clickedCellId}});
    },[]);

    const updateCell = useCallback(<T extends keyof Cell>(id: CellID, property:T, value: Cell[T])=>{
        dispatch ({type: GAME_STATE_ACTION.UPDATE_CELL, payload: {id, property, value}});
    },[]);

    /*
    const addAdjacentMine = useCallback((id: CellID)=>{
        dispatch({type: GAME_STATE_ACTION.ADD_ADJACENT_MINE});
    },[]);
    */
    const setGameOver = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.GAME_OVER});
    },[]);

    const setWin = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.WIN});
    },[]);

    const setBoardSize = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.SIZE_UPDATE});
    },[]);

    const setDifficulty = useCallback(()=>{
        dispatch({type: GAME_STATE_ACTION.DIFFICULTY_UPDATE});
    },[]);

    return {
        gameState,
        init,
        setMines,
        uncover,
        updateCell,
        //addAdjacentMine,
        setGameOver,
        setWin,
        setBoardSize,
        setDifficulty,
    }
}
