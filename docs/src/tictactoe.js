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


    const addToken = (cell,i,j) => {
        if (isValidMove(i,j))
        {
            console.log("move valid")
            board[i][j] = cell;
        }

    };



    function isValidMove(i,j) {
        //I do not check for index values less than 0 or higher than 3 because they will be part of dom manipulation
        //check to see if the value returned is != 0; if it is, then its occupied and is nnot valid
        console.log("enntering", board[i][j])
        if(board[i][j].getValue() != 0)
            return false;
        console.log("exiting")
        return true;
    } ;
    return {getBoard, getState, addToken, isValidMove};
}

function Cell ()
{
    let value = 0;

    const addValue = (player) => {value = player};

    const getValue = ( ) => {return value};

    return {addValue, getValue};
}

function Player (_name, _token)
{
    let score = 0;
    let name = _name;
    // let token = _token;

    // let cell = Cell().addValue(_token); // CURIOS WHY THIUS DOESNT WORK
    // console.log(cell.getValue())
    let cell = Cell();
    cell.addValue(_token);
    // console.log(cell, cell.getCell());
    
    // let name  = "";
    // const addToken = (_token) => {token = _token}; //Players might want to choose what they should pick
    // const getToken = () => token;
    const getName = () => name;
    const addScore =  () => score++;
    const getScore = () => score;
    // const getCell = () => cell.getValue();
    // return {addToken, addScore, getToken, getScore};
    // return {getName, getToken, addScore, getScore}
    return {getName, cell, addScore, getScore} // When should we add and when should we 
}

function GameLogic ( )
{
    return { }
}

game = GameBoard();
p1 = Player("onne", "x");
p2 = Player("twop", "y");
game.addToken(p1.cell,0,1);
game.getState();
console.log(game.getState())

// console.log(game.getState());
// p1 = Player("baba", "x");
// console.log(p1.getName(), p1.getToken(), p1.getScore())
// p1.addToken("x");
// p1.addScore();
// p1.addScore();
// p1.addScore();
// p1.addScore();
// // p1.getToken();

// console.log(p1);
// // p1 = Player("baba", "x");
// p1.addScore();
// p1.name = "";
// console.log(p1);

// // console.log(p1.getToken());
// console.log(p1.getScore());

// // p1.score = 110;
// p1.token = "x";
// console.log(p1)
// p1.token = "y";
// console.log(p1);
// p1.addScore();
// p1.addScore();
// p1.addScore();
// p1.addScore();
// console.log(p1.score);
// p1.addToken("foo");
// console.log(p1.score);