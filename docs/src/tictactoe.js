function GameBoard ( )
{
    const gridSize = 4;
    const board = [ ];

    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [ ];
        for (let j = 0; j<gridSize; j++)
            board[i].push(Cell( ));
    }

    const getBoard = ( ) => {return board};
    
    const getState = ( ) => { return board.map((cells) => console.log(cells.map((cell) => cell.getValue())))};

    const addToken = (player,i,j) => {
        if (isValidMove(i,j))
            board[i][j] = player.cell;
    };
    function isValidMove(i,j) {
        //I do not check for index values less than 0 or higher than 3 because they will be part of dom manipulation
        //check to see if the value returned is != 0; if it is, then its occupied and is nnot valid
        if(board[i][j].getValue() != 0)
        {
            console.log(`Row:${i} Column${j} is already taken. Please choose one of the available grid spaces.` )
            return false;
        }
        return true;
    };

    function check(p1, p2) {

        //TODO this should return as soon as a win is registered, not cojntinue playing.
        //check rows
        const rows = board.map((row) => row.reduce((acc, curr) => acc + curr.getValue(), 0));
        
        console.log("Row  is", rows);
        //check columns
        const columns = transpose().map((row) => row.reduce((acc, curr) => acc + curr.getValue(), 0))
        // const colresult = board[0].map((col, i) => board.map(row => row[i]).reduce((acc, curr) => acc + curr.getValue(), 0))
        console.log("Column is", columns);

        //check main diag
        const major = board.map((row,i)=> row.filter((col, j) => i == j).reduce((acc, curr) => acc + curr.getValue(), 0));
        console.log("Main diag are:", major);
        
        //check main diag
        const minor = board.reverse().map((row,i)=> row.filter((col, j) => i == j).reduce((acc, curr) => acc + curr.getValue(), 0));
        console.log("Secondary diag is", minor)

        let scores = [...rows, ...columns, ...major, ...minor];
        console.log(scores);

    //    let winner = scores.includes(-3)? p1.getName() : scores.includes(3)? p2.getName() : 0
        // return winner

        return scores.includes(-gridSize)? `Winner is Player ${p1.getName().toUpperCase()}` : scores.includes(gridSize)? `Winner is: ${p2.getName()}`: "We have no winners";
  
    }

    return {getBoard, getState, addToken, isValidMove, check};

    function  transpose( ) {
        return board[0].map((col, i) => board.map(row => row[i]));
    }

}

function Cell ()
{
    let value = 0;

    const addValue = (token) => {value = token};
    const getValue = ( ) => {return value};

    return {addValue, getValue};
}

function Player (_name, _token)
{
    let score = 0;
    let name = _name;
    // we map x and y's to -1 & 1
    let tokenizer = { "x":-1, "y":1}

    let cell = Cell();
    cell.addValue(tokenizer[_token]);
    
    const getName = () => name;
    const addScore =  () => score++;
    const getScore = () => score;

    return {getName, cell, addScore, getScore} 
}

function GameLogic ( )
{
    return { }
}

game = GameBoard( );
p1 = Player("one", "x");
p2 = Player("two", "y");


// game.addToken(p1,0,0);
game.addToken(p1,1,0);
game.addToken(p1,2,0);
game.addToken(p1,0,1);
game.addToken(p1,1,2);
game.addToken(p2,1,1);
game.addToken(p2,2,1);
game.addToken(p2,2,1);
game.addToken(p2,2,2);

game.addToken(p2,3,0);
game.addToken(p2,3,1);
game.addToken(p2,3,2);
// game.addToken(p2,3,3);

console.log("\n***********");
game.getState();

console.log(game.check(p1,p2));


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