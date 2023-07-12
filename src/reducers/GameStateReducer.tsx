import { CELL_STATE } from "../models/Cell";
import { GAME_STATE_ACTION, GameActionType } from "../models/GameAction";
import { GAME_STATE, GameStateType } from "../models/GameState";
import { generateBoard } from "../utils/api/generateBoard";
import { getAdjacentCells } from "../utils/api/getAdjacentCells";
import { getCellsToBeMined } from "../utils/api/getCellsToBeMined";
import { getCellsToUncover } from "../utils/api/getCellsToUncover";
import { countOccurrences } from "../utils/countOccurrences";

export const GameStateReducer = (gameState: GameStateType, action: GameActionType ): GameStateType => {
    const {type, payload} = action;
    switch(type) {
        case GAME_STATE_ACTION.INITIALIZE: {
            const board = generateBoard(gameState.settings.size)
            return {...gameState, state: GAME_STATE.INITIALIZED, board, initialized: true};
        }
        case GAME_STATE_ACTION.PLACE_MINES:{
            const {board, settings:{size, mines}} = gameState;
            const {clickedCellId} = payload;
            const ids = getCellsToBeMined(board, mines, clickedCellId);
            const adjacentIds = ids.flatMap(id => getAdjacentCells(size, id));
            const adjacentMinesPerId = countOccurrences(adjacentIds);
            return {
                ...gameState,
                state: GAME_STATE.MINESPLACED,
                board: {
                    ...gameState.board, 
                    cells: gameState.board.cells.map(cell => 
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
            const {clickedCellId} = payload;
            debugger;
            const cellsToUncover = getCellsToUncover(gameState.board, clickedCellId);
            const board = {
                ...gameState.board,
                cells: gameState.board.cells.map(cell => ({
                    ...cell,
                    state: cellsToUncover.includes(cell.id) ? CELL_STATE.UNCOVERED : cell.state,
                })),
            }
            return {...gameState, board};
        }
        case GAME_STATE_ACTION.UPDATE_CELL: {
            const {id, property, value} = payload;
            return {
                ...gameState, 
                board: {
                    ...gameState.board, 
                    cells: gameState.board.cells.map(cell => cell.id === id 
                        ? {...cell, [property]: value}
                        : cell),
                },
            };
        }
        case GAME_STATE_ACTION.GAME_OVER: {
            return {
                ...gameState,
                state: GAME_STATE.GAMEOVER,
                board: {
                    ...gameState.board,
                    cells: gameState.board.cells.map(cell => 
                        cell.hasMine 
                        ? {...cell, state: CELL_STATE.UNCOVERED} 
                        : cell
                        ),
                },
                gameOver: true
            };
        }
        case GAME_STATE_ACTION.WIN: {
            return {...gameState, state: GAME_STATE.WIN, win: true};
        }
        case GAME_STATE_ACTION.SIZE_UPDATE: {
            const {x, y} = payload;
            return {...gameState, settings: {...gameState.settings, size: {x, y}}};
        }
        case GAME_STATE_ACTION.DIFFICULTY_UPDATE: {
            const {difficulty} = payload;
            return {...gameState, settings: {...gameState.settings, difficulty}};
        }
        default:
            throw new Error("unhandled action received");
    }
}