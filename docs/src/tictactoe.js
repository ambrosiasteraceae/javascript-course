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

    function check() {
        let _win = 0;



        // arr = [arr[cell{getValue}, cell{getvalue}, cell{getvalue}],
        //        arr[cell{getValue}, cell{getvalue}, cell{getvalue}],
        //         arr[cell{getValue}, cell{getvalue}, cell{getvalue}]];

        
        //check rows
        // for(let i = 0; i<3; i++)
        //     for (let j =0; j<3; j++)
        // const result = board.filter((cells) => cells.filter((cell) => cell.getValue()!=0));
        const result = board.map((row) => row.filter((cell) => cell.getValue()==0));

        console.log("Result is", result);

        //check columns

        //check diagonals
        
        // return _win == 0?
    }


    // function checkWinner(){
    //     let p1 = 0;
    //     let p2 = 0;

    //     //iterate through rows: ->

    //     winner = 0;

    //     for (let i = 0; i<gridSize; i++)
    //         for(let j = 0; j<gridSize; j++)
    //         {
    //             var val = board[i,j].getValue();
    //             var check = val == 0? 0 : val == "x"? ; [... I want to avoid checkinng for x's and zero's]

    //         }

    // }


    return {getBoard, getState, addToken, isValidMove, check};
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
    // let token = _token;

    let tokenizer = { "x":-1, "y":1}

    // let cell = Cell().addValue(_token); // CURIOS WHY THIUS DOESNT WORK
    // console.log(cell.getValue())
    let cell = Cell();
    cell.addValue(tokenizer[_token]);
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


game.addToken(p1,0,1);
console.log("\n***********");
game.getState();
game.addToken(p1,1,1);
console.log("\n***********");
game.getState();
game.addToken(p1,2,1);
console.log("\n***********");
game.getState();
game.addToken(p2,1,2);
console.log("\n***********");
game.getState();
game.addToken(p2,2,2);
console.log("\n***********");
game.getState();

game.check();


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