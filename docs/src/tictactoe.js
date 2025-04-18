function GameBoard ( )
{
    /// Overall two cents, I think I overcomplicated this by a factor of 2, with the cell functions not returning a bloody property.

    const gridSize = 3;
    const board = [ ];

    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [ ];
        for (let j = 0; j<gridSize; j++)
            board[i].push(Cell( ));
    }

    const getBoard = ( ) => {return board};
    
    const getState = ( ) => { return board.map((cells) => cells.map((cell) => cell.getValue()))};

    const addToken = (player,i,j) => {
        if (isValidMove(i,j))
            board[i][j] = player.cell;
    };

    function noRemainingMoves() {
        return board.map((row, i)=> { 
            return row.filter((col, j) => col.getValue() == 0)
        }).flat().length == 0;
        
    }

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

        //TODO this should return as soon as a win is registered, not continue playing.\
        //Questionn, when do you know a game is finished?

        //check rows
        const rows = board.map((row) => row.reduce((acc, curr) => acc + curr.getValue(), 0));

        // console.log("Row  is", rows);
        //check columns
        const columns = transpose().map((row) => row.reduce((acc, curr) => acc + curr.getValue(), 0))
        // const colresult = board[0].map((col, i) => board.map(row => row[i]).reduce((acc, curr) => acc + curr.getValue(), 0))
        // console.log("Column is", columns);

        //check main diag -> the resulting diagonnal only has one gridSize elements, not 4 gridSize arrays!!
        const major = board
                        .map((row,i)=> { 
                            return row.filter((col, j) =>{
                                return i == j});
                        })
                        .reduce((acc,cell) => {
                            return acc + cell[0].getValue()}, 0);
                    
                            
        // console.log("Main diag are:", major);

        //check minor diag 
        const minor = board
                    .reverse()
                    .map((row,i)=>{
                        return row.filter((col, j) => {
                            return i == j}
                        )})
                    .reduce((acc, val) => 
                         acc + val[0].getValue(), 0)
        // console.log("Secondary diag is", minor)

        let scores = [...rows, ...columns, major, minor];
        // console.log(scores);

        // return scores.includes(-gridSize)? `Winner is Player ${p1.getName().toUpperCase()}`
        //  : scores.includes(gridSize)? `Winner is Player: ${p2.getName().toUpperCase()}`
        //  : "We have no winners";
        // console.log(p1.getName(), p2.getName())
        // console.table(getState());
        return scores.includes(-gridSize)? p1.getName(): scores.includes(gridSize)? p2.getName(): noRemainingMoves? 0 : "There are no winners";
        //  : scores.includes(gridSize)? `Winner is Player: ${p2.getName().toUpperCase()}`
        //  : "We have no winners";

    }

    return {getBoard, getState, addToken, isValidMove, check, noRemainingMoves};

    function  transpose( ) {
        return board[0].map((col, i) => board.map(row => row[i]));
    }

}

function Cell ()
{
    let value = 0;

    const addValue = (token) => {value = token};
    const getValue = ( ) => {return value}; 
    
    return {
        addValue, 
        getValue
    };
}

function Player (_name, _token)
{
    let score = 0;
    let name = _name;
    // we map x and y's to -1 & 1
    let tokenizer = { "x":-1, "y":1}

    let cell = Cell();
    cell.addValue(tokenizer[_token]);
    
    const getName = () => `Player:${name.toUpperCase()}`;
    const addScore =  () => score++;
    const getScore = () => score;

    return {getName, cell, addScore, getScore} 
}

function GameLogic (p1, p2)
{
    // let players = [p1, p2];
    let turn = true;
    // let firstPlayer = flip? p2: p1
    // let turn = true;
    //Assume for now that player 1 goes first
    game = GameBoard();
    // const validMoves =
    const print =  () => console.table(board);
    
    function playRound (i,j)
    {
        // while (noRemainingMoves)

        let activePlayer = turn? p1 : p2
        turn =!turn;
        game.addToken(activePlayer, i, j);
        // board = game.getState();
        // console.log(game.getState());
        return game.check(p1,p2);
    }

    function playGame(i,j)
    {
        while(game.check()==0)
            playRound(i,j)
        return game.check();
    }
   
    // console.log()
    return {playRound, print, game}
    // let nextPlayer = !
    // lets us choose who goes first?
    //handles player creation
    //gives us the board state?
    // lets us play the next round
    // assignns player turnn
    // return { }
}
p1 = Player("one", "x");
p2 = Player("two", "y");
tictac = GameLogic(p1, p2);

// tictac
console.log(tictac.playRound(0, 0));
console.log(tictac.playRound(1, 1));
console.log(tictac.playRound(1, 0));
console.log(tictac.playRound(2, 2));
console.log(tictac.playRound(2, 0));
// tictac.playRound(1, 0);

console.log(tictac.game.getState())
// console.table(tictac.game.getState())
// tictac.playRound(2,0);
// tictac.playRound(1,1);
// tictac.playRound(1,2);
// // tictac.playRound(1,2);
// tictac.playRound(2,2);
// tictac.game.getState();
// tictac.game.getBoard();
// tictac.playRound(1,1);
// tictac.game.check(p1,p2);
// console.log(tictac.game.check(p1,p2))
// tictac.playRound(3, 0);
// tictac.print();
// console.log("RemainingMoves")
// console.log(tictac.game.noRemainingMoves());


// game.addToken(p1,0,0);
// game.addToken(p1,1,0);
// game.addToken(p1,2,0);
// game.addToken(p1,0,1);
// game.addToken(p1,1,2);
// // game.addToken(p2,1,1);
// game.addToken(p2,2,1);
// game.addToken(p2,2,1);
// game.addToken(p2,2,2);

// game.addToken(p2,0,0);
// game.addToken(p2,1,1);
// game.addToken(p2,2,2);
// // game.addToken(p2,3,3);

// // game.addToken(p1,3,0);
// // game.addToken(p1,2,1);
// game.addToken(p1,1,2);
// game.addToken(p1,0,3);

// game.addToken(p1,3,3);
// game.addToken(p1,3,2);
// game.addToken(p1,3,0);
// game.addToken(p1,3,1);




// console.log("\n***********");
// // game.getState();

// console.table(game.getState())
// console.log(game.check(p1,p2));

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