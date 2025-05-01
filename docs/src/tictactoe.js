function Board ()
{
    /// Overall two cents, I think I overcomplicated this by a factor of 2, with the cell functions not returning a bloody property.

    const gridSize = 3;
    const board = [];

    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [];
        for (let j = 0; j<gridSize; j++)
            board[i].push(Cell());
    }

    const getBoard = () => board;
    
    const getState = () => board.map((cells) => cells.map((cell) => cell.getValue()));

    const addToken = (player,i,j) => {
        // console.log(player.getName(),  player.cell.getValue())
        if (isValidMove(i,j))
            board[i][j] = player.cell;
    };

    function noRemainingMoves() {
        return board.map((row, i) => { 
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
                    .toReversed()
                    .map((row,i)=>{
                        return row.filter((col, j) => {
                            return i == j}
                        )})
                    .reduce((acc, val) => 
                         acc + val[0].getValue(), 0)
        // console.log("Secondary diag is", minor)

        let scores = [...rows, ...columns, major, minor];
        console.log(scores);

        // return scores.includes(-gridSize)? `Winner is Player ${p1.getName().toUpperCase()}`
        //  : scores.includes(gridSize)? `Winner is Player: ${p2.getName().toUpperCase()}`
        //  : "We have no winners";
        // console.log(p1.getName(), p2.getName())
        // console.table(getState());
        //  : scores.includes(gridSize)? `Winner is Player: ${p2.getName().toUpperCase()}`
        //  : "We have no winners";
        // return scores.includes(-gridSize)? -1: scores.includes(gridSize)? 1 : noRemainingMoves? 0 : 2;
        return scores.includes(-gridSize)? -1: scores.includes(gridSize)? 1 : scores.includes(0)? 0 : 2;
    }

    return {getBoard, getState, addToken, isValidMove, check, noRemainingMoves};

    function  transpose() {
        return board[0].map((col, i) => getBoard().map(row => row[i]));
    }

}

function Cell ()
{
    let value = 0;

    const addValue = (token) => {value = token};
    const getValue = () => {return value}; 
    
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
    let tokenizer = { "X":-1, "O":1}

    let cell = Cell();
    cell.addValue(tokenizer[_token]);
    const getToken = () => _token;
    const getName = () => `Player:${name.toUpperCase()}`;
    const addScore =  () => score++;
    const getScore = () => score;

    return {getName, cell, addScore, getScore, getToken} 
}

function GameLogic (p1, p2)
{
    // let players = [p1, p2];
    let turn = true;
    // let firstPlayer = flip? p2: p1
    // let turn = true;
    //Assume for now that player 1 goes first
    const board = Board();

    const print =  () => console.table(board);
    
    const getActivePlayer = () => {return turn? p1 : p2}

    function playRound (i,j)
    {
        board.addToken( getActivePlayer(), i, j);
        turn =!turn;
        return board.check(p1,p2);
    }
    
    return {playRound, print, board, getActivePlayer}
    
}

function GameController() {

    //Why should we choose to rerender the whole scene instead of just updating the board UI on each turn?
    //Since we are now rerendering we need to add the event handlrs either to the main or to the .cell divs everytime
    const main = document.querySelector(".main");
    const btn = document.querySelector(".reset"); 
    const ann = document.querySelector(".announcement"); 
    let result = 0;
    p1 = Player("Vasile", "X");
    p2 = Player("Ambrozie", "O");
    game = GameLogic(p1, p2);

    renderScene();

    function renderScene(){
        
        main.textContent = "";    
        let gridSize = 3;
        for (let i = 0; i<gridSize; i++)
            for(let j = 0; j<gridSize; j++)
            {
                const ele = document.createElement("div");
                const value = game.board.getBoard()[i][j].getValue();
                // console.log("Value is:;", value);
                ele.classList = "cell"; 
                ele.datakey = [i,j]; 
                if (value == -1)
                    ele.textContent = p1.getToken();
                else if (value == 1)
                    ele.textContent = p2.getToken();
                else
                    ele.textContent = "";
                main.appendChild(ele);      
            }  
            // ann.textContent = game.getActivePlayer().getName()         
    }

    function checkWinner(result) {
    
        if (result == -1)
            return(`${p1.getName()} wins`)
        else if(result == 1)
            return(`${p2.getName()} wins`)
        else if(result == 2)
            return("Draw")
    }
    
    function clickHandler(e) {

        const data = e.target.datakey;
        // ann.textContent = game.getActivePlayer().getName()
        console.log(game.getActivePlayer().getName())
    
        if (result == 0)
        {
            
            result = game.playRound(data[0],data[1]);
            ann.textContent = checkWinner(result);
            
        }
        renderScene();
  
    }

    function resetGame()
    {
        result = 0;
        game = GameLogic(p1, p2);
    }
    
    main.addEventListener("click", clickHandler);
    btn.addEventListener("click", resetGame);
 
    renderScene()
  
    }
GameController();