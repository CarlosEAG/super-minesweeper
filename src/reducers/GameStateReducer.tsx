import { BoardDimensions } from "../models/BoardDimensions";
import { CELL_STATE } from "../models/Cell";
import { GAME_STATE_ACTION, GameActionType } from "../models/GameAction";
import { GAME_STATE, GameStateType } from "../models/GameState";
import { DifficultyConfiguration, difficulty } from "../models/Settings";
import { generateBoard } from "../utils/api/generateBoard";
import { getAdjacentCells } from "../utils/api/getAdjacentCells";
import { getCellsToBeMined } from "../utils/api/getCellsToBeMined";
import { getCellsToUncover } from "../utils/api/getCellsToUncover";
import { countOccurrences } from "../utils/countOccurrences";
const nextCellStates = {
    [CELL_STATE.QUESTION_MARKED]: CELL_STATE.COVERED,
    [CELL_STATE.COVERED]: CELL_STATE.FLAGGED,
    [CELL_STATE.FLAGGED]: CELL_STATE.QUESTION_MARKED,
    [CELL_STATE.UNCOVERED]: CELL_STATE.UNCOVERED,
};

const difficultyConfig: Record<difficulty, DifficultyConfiguration>= {
    'Beginner': {size:{x: 9, y: 9}, mines: 10},
    'Intermediate': {size:{x: 12, y: 12}, mines: 50},
    'Expert': {size:{x: 17, y: 17}, mines: 80},
    'Custom': {size:{x: 0, y: 0}, mines: 0},
}
export const GameStateReducer = (gameState: GameStateType, action: GameActionType ): GameStateType => {
    const {type, payload} = action;
    switch(type) {
        case GAME_STATE_ACTION.INITIALIZE: {
            const board = generateBoard(gameState.settings.configuration.size)
            return {...gameState, flags: gameState.settings.configuration.mines, cellsLeft: gameState.settings.configuration.size.x * gameState.settings.configuration.size.y, lastAmountUncovered: 0, state: GAME_STATE.INITIALIZED, board, initialized: true};
        }
        case GAME_STATE_ACTION.PLACE_MINES:{
            const {board, settings:{configuration:{size, mines}}} = gameState;
            const {clickedCellId} = payload;
            const ids = getCellsToBeMined(board, mines, clickedCellId);
            const adjacentIds = ids.flatMap(id => getAdjacentCells(size, id));
            const adjacentMinesPerId = countOccurrences(adjacentIds);
            return {
                ...gameState,
                state: GAME_STATE.MINESPLACED,
                flags: mines,
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
            const cellsToUncover = getCellsToUncover(gameState.board, clickedCellId);
            const lastAmountUncovered = cellsToUncover.length;
            const cellsLeft = gameState.cellsLeft - lastAmountUncovered;
            const board = {
                ...gameState.board,
                cells: gameState.board.cells.map(cell => ({
                    ...cell,
                    state: cellsToUncover.includes(cell.id) ? CELL_STATE.UNCOVERED : cell.state,
                })),
            }
            return {...gameState, cellsLeft, lastAmountUncovered, board};
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
                        cell.hasMine && cell.state !== CELL_STATE.FLAGGED
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
            return {...gameState, settings: {...gameState.settings, configuration:{...gameState.settings.configuration, size: {x, y}}}};
        }
        case GAME_STATE_ACTION.DIFFICULTY_UPDATE: {
            const {difficulty, customConfig} = payload;
            const configuration = customConfig || difficultyConfig[difficulty as difficulty];
            return {...gameState, settings: {...gameState.settings, difficulty, configuration}};
        }
        case GAME_STATE_ACTION.CYCLE_CELL: {
            const {clickedCellId} = payload;
            const currentState = gameState.board.cells[clickedCellId-1].state;
            if(currentState === CELL_STATE.UNCOVERED){
                return gameState;
            }
            const newState=nextCellStates[currentState];
            let {flags} = gameState; 
            if(currentState === CELL_STATE.COVERED && flags===0){
                return gameState;
            }
            
            if(currentState === CELL_STATE.COVERED){
                flags -= 1;
            }
            if(newState === CELL_STATE.COVERED && flags<gameState.settings.configuration.mines){
                flags += 1;
            }
            return {
                ...gameState,
                flags,
                board: {
                    ...gameState.board,
                    cells: gameState.board.cells.map(cell => 
                        cell.id === clickedCellId
                        ? {
                            ...cell,
                            state: newState,
                        }
                        : cell 
                    ),
                }
            }
        }
        default:
            throw new Error("unhandled action received");
    }
}