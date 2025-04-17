function GameBoard ( )
{
    const gridSize = 3;
    const board = [ ];

    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [ ];
        for (let j = 0; j<gridSize; j++)
            board[i].push(Cell( ));
    }

    const getBoard = ( ) => {return board};
    // const getState = ( ) => { return board.forEach((item) => item.forEach((cell) => cell.getValue))}
    const getState = ( ) => { return board.map((cells) => cells.map((cell) => cell.getValue()))};

    return {getBoard, getState}
}

function Cell ( )
{
    const value = 0;

    const addValue = (player) => {value = player};

    const getValue = ( ) => {return value};

    return {addValue, getValue};
}

function Player ( )
{
    return { }
}

function GameLogic ( )
{
    return { }
}

game = GameBoard();
console.log(game.getState());