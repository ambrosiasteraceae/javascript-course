function Board (gridSize)
{
    /// Overall two cents, I think I overcomplicated this by a factor of 2, with the cell functions not returning a bloody property.
    // Convert to number all that you capture from the web
    // const gridSize = 3;
    const board = [];
    let scores = [];

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
        else //We need to return in order for not to switch player turn  in case we do not add to the board
            return 0
        return 1
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

        scores = [...rows, ...columns, major, minor];
        // console.log(scores);
        // console.log(gridSize);
        // console.log(Number.isInteger(gridSize));
        // console.log(scores.includes(gridSize));
        // console.log(scores.includes(-gridSize));

        // console.log(board.map((row, i) => { 
        //     return row.filter((col, j) => col.getValue() == 0)
        // }).flat())
        
        return scores.includes(-gridSize)? -1: scores.includes(gridSize)? 1 : noRemainingMoves()? 2 : 0;
        
    }
    const getScore = () => scores;

    return {getBoard, getState, addToken, isValidMove, check, noRemainingMoves, getScore};

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
    let tokenizer = { "X":-1, "O":1};

    let cell = Cell();
    cell.addValue(tokenizer[_token]);
    const getToken = () => _token;
    const getName = () => `Player:${name.toUpperCase()}`;
    const addScore =  () => score++;
    const getScore = () => score;

    return {getName, cell, addScore, getScore, getToken} 
}

function GameLogic (gridSize, p1, p2)
{
    
    let turn = true;
    const board = Board(gridSize);
    const print =  () => console.table(board);
    const getActivePlayer = () => {return turn? p1 : p2}

    function playRound (i,j)
    {
        insert = board.addToken( getActivePlayer(), i, j);
        if (insert==1)
            turn =!turn;
        // console.log(board.check(p1,p2), "check imn rorsss");
        return board.check(p1,p2);
    }
    return {playRound, print, board, getActivePlayer}    
}

function GameController() 
{
    //Why should we choose to rerender the whole scene instead of just updating the board UI on each turn?
    //Since we are now rerendering we need to add the event handlrs either to the main or to the .cell divs everytime
    const main = document.querySelector(".main");
    const btn = document.querySelector(".reset"); 
    const ann = document.querySelector(".announcement"); 
    const select = document.querySelector("select");
    
    let win = false;
    let gridSize = Number(select.value);
    
    p1 = Player("Vasile", "X");
    p2 = Player("Ambrozie", "O");
    game = GameLogic(gridSize, p1, p2);
    // renderScene();
  
    function renderScene()
    {
        main.textContent = "";    
        let gridSize = select.value;
        console.log
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
                ele.style.color= ele.textContent == "X" ? "#135e99" : ele.textContent == "O" ? "#ed1a6a" : "";
            
                main.appendChild(ele);
                main.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
                main.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
                // grid-template-columns: repeat(3,1fr);
                // grid-template-rows: repeat(3,1fr);      
            }           
    }

function checkWinner(result){
    switch (result)
    {    
        case 1:
            ann.textContent = `${p1.getName()} wins`;
            // cellIndeces = generateWincondition(result);
            // console.log(cellIndeces);
            return true
        case -1: 
            ann.textContent = `${p2.getName()} wins`;
            // cellIndeces = generateWincondition(result);
            // console.log(cellIndeces);
            return true;
        case 2:
            ann.textContent = "Its a Draw!";
            return true;
        default:
            return false;
    }
 }

    function clickHandler(e) 
    {
        const data = e.target.datakey;
        if (!win)
        {
            result = game.playRound(data[0],data[1]);
            win = checkWinner(result);
            if (win == true && result!=2)
            {
                renderScene();
                cellIndeces = generateWincondition(result);
                console.log(cellIndeces);
                onPlayerWinHighlight(cellIndeces)
                return
            }     
        }
        renderScene();
    }

    function resetGame()
    {
        win = false;
        
        ann.textContent = "";
        gridSize = Number(select.value);
        game = GameLogic(gridSize, p1, p2);
        renderScene();
        
    }

    function onDivPlayerHover(){};
    function displayScore(){};
    function onPlayerTokenChange(){};
    function onPlayerTurnChange(){};

    function generateWincondition(sign)
    {
        scores = game.board.getScore();
        // console.log(scores);
        index = scores.findIndex((x) => x == sign * gridSize);
        let cellIndexes = [];
    
        if (index == -1)
            return

        switch(true)
        {
            case (index < gridSize):
                console.log("rows")
                for (let ri = 0; ri < gridSize; ri++)
                    cellIndexes.push(ri+gridSize*index);
                break;
            case (index < gridSize*2):
                console.log("cols")
                for (let ci = 0; ci < gridSize ; ci++)
                    cellIndexes.push(index%gridSize +gridSize*ci);  
                break;
           case (index == scores.length -2):
                console.log("majmor")
                for(let mai = 0; mai< gridSize; mai++)
                    cellIndexes.push(mai + mai * gridSize);
                break;
            case (index == scores.length -1):
                console.log("minor")
                for(let mni = 0; mni< gridSize; mni++)
                    cellIndexes.push((1 + mni)* (gridSize-1));
                break;
            // default:
            //     console.log("Index -1")
        }
        return cellIndexes;
        
    }

 
    function onPlayerWinHighlight(indeces)
    {
        //Clicking the handler after displayimg the view would rerender the scene and all progress will be lost
        const cells = document.querySelectorAll(".cell");

        for(let i=0; i<cells.length; i++)
        {
            if(indeces.includes (i))
                cells[i].style.fontWeight = "bolder"
            else
                cells[i].style.color = "gray"
    
            console.log( cells[indeces[i]])
        }
     
    };


    main.addEventListener("click", clickHandler);
    btn.addEventListener("click", resetGame);
    select.addEventListener("change", resetGame)
 
    renderScene();
}
    
GameController();