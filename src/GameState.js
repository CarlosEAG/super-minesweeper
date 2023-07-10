const GameState = {
    gameOver: false,
    win: false,
    board: [],
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

const generateBoard = (x,y) => {
    const size = x*y;
    const ids = [...Array(size)].map((_,id) => id+1);
    const board = ids.map( id => ({
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

    return board;
};

const placeMines = (board, mines) => {
    const ids = board.map(cell => cell.id);
    const mineIds = sampleRange(ids, mines);
    mineIds.forEach(id => {
        board[id].hasMine = true;
    })
    //return board;
};

const init = (current) => {
    const {settings: {x, y, mines}} = current;
    const board = generateBoard(x,y);
    placeMines(board,mines)
    return {
        ...current,
        board
    };
};