import { GAME_STATE_ACTION, GameActionType } from "../models/GameAction";
import { GameStateType } from "../models/GameState";

export const GameStateReducer = (state: GameStateType, action: GameActionType ) => {
    const {type, payload} = action;
    switch(type) {
        case GAME_STATE_ACTION.INITIALIZE:
            return {...state, ...payload};
        case GAME_STATE_ACTION.UPDATE_CELLS:
            return {...state, board: {...state.board, cells: payload}};
        default:
            throw new Error("unhandled action received");
    }
}