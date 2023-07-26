import { CELL_STATE, cellState } from "../../../models/Cell";
import { cellStylesType } from "./cellStyles";
import { numberToText } from "./numberToText";

type getDisplayStateType= (
    state: cellState,
    hasMine: boolean,
    adjacentMines: number,
    isGameOver: boolean,
    ) => [cellStylesType,string];

export const getDisplayState: getDisplayStateType = (state, hasMine, adjacentMines, isGameOver)=>{
    let displayState:cellStylesType = 'covered';
    let content: string = '';
    switch(state){
        case CELL_STATE.QUESTION_MARKED:{
            displayState = 'flagged';
            content = '?';
            break;
        }
        case CELL_STATE.FLAGGED: {
            if(isGameOver && !hasMine) {
                displayState = 'wrongFlag';
                content = '❌';
                break;
            }
            if(isGameOver && hasMine){
                content='F';
            }
            displayState = 'flagged';
            content = '⚐';
            break;
        }
        case CELL_STATE.UNCOVERED:{
            if(hasMine){
                displayState = 'mined';
                content = '☉';
                break;
            }
            if(adjacentMines > 0){
                displayState = numberToText[adjacentMines];
                content = `${adjacentMines}`;
                break;
            }
            
            displayState = 'empty';
            break;
        }
        default: {
            displayState = 'covered';
        }       
    }
    return [displayState, content];
};