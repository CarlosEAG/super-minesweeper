const GameState = {
    gameOver: false,
    win: false,
    board: {
        cells: [],
        size: {
            x: 10,
            y:10,
        },
    },
    settings: {
        size:{
            x:10,
            y:10,
        },
        mines:10,
    },
    difficulty: 'beginer',
};

const CELL_STATE = {
    COVERED: 0,
    UNCOVERED: 1,
    FLAGGED: 2,
    QUESTION_MARKED: 3,
    /*
    MINED: 3,
    WRONG_FLAG: 4,
    CLIKED_MINE: 5,
    //*/
};

const sampleRange = (range, n) => {
    var sample = [];
    for(var i=0; i<n; i++) {
        sample.push(range.splice(Math.random()*range.length,1));
    }
    return sample.flat();
};
const getAdjacentCells = (size, id) => {
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

const generateBoard = (x,y) => {
    const size = x*y;
    const ids = [...Array(size)].map((_,id) => id+1);
    const cells = ids.map( id => ({
        id,
        state: CELL_STATE.COVERED,
        adjacentMines: 0,
        hasMine: false,
        /*
        isCovered: true,
        isFlagged: false,
        isQuestionMarked: false,
        hasAdjacentMine: false,
        //*/
    }));
    const board = {
        cells,
        size: {x,y},
    };
    return board;
};

const placeMines = (board, mines) => {
    const ids = board.cells.map(cell => cell.id);
    const mineIds = sampleRange(ids, mines);
    mineIds.forEach(id => {
        board.cells[id].hasMine = true;
        const adjacentCellIds = getAdjacentCells(board.size, id);
        adjacentCellIds.forEach(id => {
            board.cells[id].adjacentMines += 1;
        })
    });
    //return board;
};


const init = (current) => {
    const {settings: {size, mines}} = current;
    const {x,y} = size;
    const board = generateBoard(x,y);
    placeMines(board,mines)
    return {
        ...current,
        board
    };
};

//Can inner elements of a state be directly modified? or should they be modified in a clone of the state object?
const _uncoverCells = (board, id) => {
    const ids = [id];
    const {cells} = board;
    const outputIds = [];
    //this should be checked outside before calling this function.
    //if the clicked cell has a mine, the game should call Game Over instead of this function.
    if(cells[id].hasMine){
        return ids;
    }

    while(ids.length > 0) {
        const currentId = ids.shift();
        const currentCell = cells[currentId];
        const {state, adjacentMines} = currentCell;
        const invalidStates = [CELL_STATE.UNCOVERED, CELL_STATE.FLAGGED, CELL_STATE.QUESTION_MARKED];

        if(invalidStates.includes(state)) {
            return;
        }
        currentCell.state = CELL_STATE.UNCOVERED;
        ids.push(...getAdjacentCells(board.size,id));
    }
};

const getCellsToUncover = (board, id) => {
    const ids = [id];
    const {cells} = board;
    const outputIds = [];

    while(ids.length > 0) {
        const currentId = ids.shift();
        const cellState = cells[currentId].state;
        const invalidStates = [CELL_STATE.UNCOVERED, CELL_STATE.FLAGGED, CELL_STATE.QUESTION_MARKED];
        if(invalidStates.includes(cellState)) {
            return;
        }
        outputIds.push(currentId);
        ids.push(...getAdjacentCells(board.size,id));
    }
};

//This alternative gets a list of the cells to be uncovered instead of directly modifying the board state,
//then it returns a copy of the board that implements the state change
const uncoverCells = (board, id) => {
    const cellsToUncover = getCellsToUncover(board, id);
    const newBoard = {
        ...board,
        cells: board.cells.map((cell, id) => ({
            ...cell,
            state: ids.includes(cellsToUncover) ? CELL_STATE.STATE_UNCOVERED : cell.state,
        }))
    }
    return newBoard;
}