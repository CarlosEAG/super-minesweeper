import { BoardDimensions } from "../../models/BoardDimensions";
import { CellID } from "../../models/Cell";

export const getAdjacentCells = (size:BoardDimensions, id:CellID) => {
    const ids=[];
    const {x:cols, y: rows} = size;

    var top =false;
    var bottom=false;
    var left=false;
    var right=false;

    //when starting from 1:
    //the id of every cell in the first row is less or equal than the number of columns
    if(id<=cols){
        top=true;
    }
    //the id of the cell before the last row equals rows * cols - cols
    if(id>(rows*cols)-cols){
        bottom=true;
    }
    //the id of every cell at the end of a row is a multiple of the number of columns
    if(id%cols==0){
        right=true;
    }
    //the id of every cell at the start of a row is equal to a multiple minus one of the number of columns
    if((id-1)%cols==0){
        left=true;
    }

    //if the cell corresponding to the input id is not at the start of a row, add ids for left, top-left and bottom-left cells to the output array
    if(!left){
        ids.push(id-1);
        if(!top){
            ids.push(id-cols-1);
        }
        if(!bottom){
            ids.push(id+cols-1);
        }
    }
    //if the cell corresponding to the input id is not at the end of a row, add ids for right, top-right and bottom-right cells to the output array
    if(!right){
        ids.push(id+1);
        if(!top){
            ids.push(id-cols+1);
        }
        if(!bottom){
            ids.push(id+cols+1);
        }
    }

    //id of the cell right above is the input id minus the number of columns
    if(!top){
        ids.push(id-cols);
    }
    //id of the cell right below is the input id plus the number of columns
    if(!bottom){
        ids.push(id+cols);
    }

    return ids;
};