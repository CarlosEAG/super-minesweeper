import { CELL_STATE } from "../models/Cell";
import { GAME_STATE_ACTION, GameActionType } from "../models/GameAction";
import { GameStateType } from "../models/GameState";
import { generateBoard } from "../utils/api/generateBoard";
import { getAdjacentCells } from "../utils/api/getAdjacentCells";
import { getCellsToBeMined } from "../utils/api/getCellsToBeMined";
import { getCellsToUncover } from "../utils/api/getCellsToUncover";
import { countOccurrences } from "../utils/countOccurrences";

export const GameStateReducer = (state: GameStateType, action: GameActionType ): GameStateType => {
    const {type, payload} = action;
    switch(type) {
        case GAME_STATE_ACTION.INITIALIZE: {
            const board = generateBoard(state.settings.size)
            return {...state, board, initialized: true};
        }
        case GAME_STATE_ACTION.PLACE_MINES:{
            const {board, settings:{size, mines}} = state;
            const {clickedId} = payload;
            const ids = getCellsToBeMined(board, mines, clickedId);
            const adjacentIds = ids.flatMap(id => getAdjacentCells(size, id));
            const adjacentMinesPerId = countOccurrences(adjacentIds);
            return {
                ...state, 
                board: {
                    ...state.board, 
                    cells: state.board.cells.map(cell => 
                        ids.includes(cell.id)
                            ? {
                                ...cell, 
                                hasMine: true
                            } 
                            : {
                                ...cell, 
                                adjacentMines: adjacentMinesPerId[cell.id] || cell.adjacentMines
                            }
                    )
                }
            };
        }
        case GAME_STATE_ACTION.UNCOVER_CELLS: {
            const {clickedId} = payload;
            const cellsToUncover = getCellsToUncover(state.board, clickedId);
            const board = {
                ...state.board,
                cells: state.board.cells.map((cell, id) => ({
                    ...cell,
                    state: cellsToUncover.includes(id) ? CELL_STATE.UNCOVERED : cell.state,
                })),
            }
            return {...state, board};
        }
        case GAME_STATE_ACTION.UPDATE_CELL: {
            const {id, property, value} = payload;
            return {
                ...state, 
                board: {
                    ...state.board, 
                    cells: state.board.cells.map(cell => cell.id === id 
                        ? {...cell, [property]: value}
                        : cell),
                },
            };
        }
        case GAME_STATE_ACTION.GAME_OVER: {
            return {...state, gameOver: true};
        }
        case GAME_STATE_ACTION.WIN: {
            return {...state, win: true};
        }
        case GAME_STATE_ACTION.SIZE_UPDATE: {
            const {x, y} = payload;
            return {...state, settings: {...state.settings, size: {x, y}}};
        }
        case GAME_STATE_ACTION.DIFFICULTY_UPDATE: {
            const {difficulty} = payload;
            return {...state, settings: {...state.settings, difficulty}};
        }
        default:
            throw new Error("unhandled action received");
    }
}