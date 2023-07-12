export const enum GAME_STATE_ACTION {
    INITIALIZE,
    PLACE_MINES,
    UPDATE_CELL,
    GAME_OVER,
    WIN,
    SET_MINES,
    UNCOVER_CELLS,
    ADD_ADJACENT_MINE,
    SIZE_UPDATE,
    DIFFICULTY_UPDATE,
}

export interface GameActionType {
    type: GAME_STATE_ACTION,
    payload?: any,
};
