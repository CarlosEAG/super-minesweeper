export const enum GAME_STATE_ACTION {
    INITIALIZE,
    UPDATE_CELLS,
    GAME_OVER,
    WIN,
}

export interface GameActionType {
    type: GAME_STATE_ACTION,
    payload?: any,
};
