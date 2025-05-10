function Board (gridSize, winCondition)
{
    const board = [];
    const gridCondition =winCondition;

    const interPositions = getInterDiagonalPositions();
    const mainPositions =getMainPositions();
    //Initialize board
    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [];
        for (let j = 0; j<gridSize; j++)
            board[i].push(0);
    }

    const getBoard = () => board;
    
    const getState = () => board.map((cells) => cells.map((cell) => cell));

    const addToken = (player,i,j) => {  
        if (isValidMove(i,j))
        {
            board[i][j] = player.getValue();
            return true
        }
        return false
    };

    function isBoardFull() {
        return board.flat().map(((cell) => cell == 0)).every((v)=> v ==false)
    };
 
    function isValidMove(i,j) {
      
        if(board[i][j] != 0)
        {
            // console.log(`Row:${i} Column${j} is already taken. Please choose one of the available grid spaces.` )
            return false;
        }
        return true;
    };
 
    function isStreak(arr)
    {
        count = 1;
        val = arr[0];
        for (let i=1; i<arr.length; i++)
        {
            if (val == arr[i] && arr[i] != 0)
                count +=1;
            else
            {
                count = 1;
                val = arr[i]
            }
            if(count == gridCondition)
                return true
        }
        return false
    }
    
    function getInterDiagonalPositions()
    {
        //Algorithm traverses the fist and last column of the board and gets all the intermediary diagonals. Scales with n boards.
        // on each d iteration it actually traverses both sides based on the diagonal length
        // Whenever d is incremented, the length of the diagonals returned decreases by 1
        // No diagonals with a length less than 3 are returned
        secondaryPositions = [];
        n = (gridSize-3); // number of diagonals per side (left and right being first col and last col)
        for(let d = 0; d<n; d++)
        {   
            let j = 0;
            let k = gridSize -1;
            let leftTop = [];
            let leftBot = [];
            let rightTop = [];
            let rightBot = [];
            
            for(let i = d+1; i<gridSize; i++)
            {
                leftTop.push([i,j]);
                leftBot.push([gridSize-i-1,j]);
                rightTop.push([gridSize-1-i,k]);
                rightBot.push([i,k]);
                j++;
                k--;
            }      
            secondaryPositions.push(leftBot);
            secondaryPositions.push(leftTop);
            secondaryPositions.push(rightBot);
            secondaryPositions.push(rightTop);
        }
 
        // console.log(secondaryPositions.map((arr) => arr.map((cell) => cell.join(""))))
        // console.log(secondaryPositions)
 
        return secondaryPositions;
    }

    function checkInterDiagonals()
    {
        diagonals = interPositions.map((posArray) => posArray.map((pos) => board[pos[0]][pos[1]]));
        return diagonals.map((arr) => isStreak(arr))
    }

    function checkMain() {

        //check rows
        const rows = board.map((row) => isStreak(row));

        //check columns
        const columns = transpose().map((row) => isStreak(row));
        
        //check main diag 
        const major = isStreak(board
                        .map((row,i)=> { 
                            return row.filter((col, j) =>{
                                return i == j})[0];
                        }));
    
        //check minor diag 
        const minor = isStreak(board
                    .toReversed()
                    .map((row,i)=>{
                        return row.filter((col, j) => {
                            return i == j}
                        )[0]}));


        states = [...rows, ...columns, major, minor];
        return states
    }

    function getMainPositions()
    {

        cols = [];
        rows = [];
        major = [];
        minor = [];
        
        //Initialize board
        for (let i = 0; i < gridSize ; i++)
        {   
            row = [];
            col = [];
            for (let j = 0; j<gridSize; j++)
                {
                    row.push([i,j]);
                    col.push([j,i]);
                    if(i==j)
                        major.push([i,j])
                    if((i+j) == gridSize-1)
                        minor.push([i, j])
                };
            cols.push(col)
            rows.push(row)
        } 
        return [...rows , ...cols, major, minor]      
    }

    const getPositions = () => {
        return [...mainPositions, ...interPositions]
    }

    return {getBoard, getState, addToken, isValidMove, isStreak, getPositions, checkMain, isBoardFull, checkInterDiagonals};

    function  transpose() {
        return board[0].map((col, i) => getBoard().map(row => row[i]));
    }
}

function Player (_name, _token)
{
    let score = 0;
    let name = _name;

    let tokens = { "X":-1, "O":1};

    const getValue = () => tokens[_token]
    const getToken = () => _token;
    const getName = () => `${name.toUpperCase()}`;
    const addScore =  () => score++;
    const getScore = () => score;
    const resetScore = () => score = 0;

    return {getName, getValue, addScore, getScore, getToken, resetScore} 
}

function GameLogic (gridSize,gridCondition, p1, p2, selectedPlayer)
{
    let turn = selectedPlayer;
    let state = [];

    const board = Board(gridSize, gridCondition);
    const positions = board.getPositions();


    const print =  () => console.table(board.getBoard());
    const getActivePlayer = () => {return turn? p1 : p2};
    const getState =  () =>  {return state}

    const switchPlayer =()=> {
        turn =! turn};

    function playRound (i,j)
    { 
        let success = board.addToken( getActivePlayer(), i, j);        
        if (success)
        {
            switchPlayer();
            const main = board.checkMain();
            const inter = board.checkInterDiagonals();
            state = [...main, ...inter];

        }
        return success        
    }
    return {playRound, print, board, getActivePlayer, positions, getState, switchPlayer}    
}

function GameController() 
{
    //Why should we choose to rerender the whole scene instead of just updating the board UI on each turn?
    //Since we are now rerendering we need to add the event handlrs either to the main or to the .cell divs everytime
   
    const main = document.querySelector(".main");
    const btn = document.querySelector(".reset"); 
    const ann = document.querySelector(".announcement"); 
    const select = document.querySelector("select");

    let winStreak = document.querySelector("input[name=grid-condition]:checked");
    let selectedPlayer = document.querySelector("input[name=token]:checked");


    let gridSize = Number(select.value);
    let gridConditionWin = Number(winStreak.value);
    
    let startPlayer = selectedPlayer.value == "X"? true : false; 
    
    p1 = Player("Vasile", "X");
    p2 = Player("Ambrozie", "O");
    
    game = GameLogic(gridSize,  gridConditionWin,  p1, p2, startPlayer);
    const generateVisited = () => game.positions.map((pos) => false);
    renderScene();

    let visited =  generateVisited()// keeps track of grids that have been visited (where wins are registered) and flagged
    dislayTurn();
    
    function clickHandler(e) 
    {
        //This will require a rework as it does too much already and its hard to read.

        [i, j] = e.target.getAttribute("data-coords").split(",")
        if(!game.board.isBoardFull())
        {
            success = game.playRound(Number(i), Number(j))

            if(success)
                assignToken(i,j)
            else
                return
            state = game.getState();
            dislayTurn();
            for(let i = 0; i<state.length; i++)
            {
                if(state[i] == true)
                {            
                    const arr = game.positions[i];
                    cells = getCellsFromCoords(arr)
                    val = getBoardValFromPos(arr);
                    player =  assignPlayerWin(val);
                    if(!visited[i])
                    {
                        // console.log("\n")
                        // console.log(arr.map((cell) => cell.join("")))
                        winningCells = filterWinningCells(cells);
                        player.addScore();
                    }
                    displayScore();
                   
                    // console.log("wiining cells is:",winningCells)
                    cells.forEach((cell, index)=> 
                    {
                        if(cell.textContent == player.getToken())
                        {                            
                            if(!visited[i]) // we check to see if a win was registered prior as we do not want to highlight the same cells again    
                            {
                                if (winningCells[index] == true)
                                {   
                                    cell.style.color= cell.textContent == "X" ? "#135e99" : cell.textContent == "O" ? "#ed1a6a" : "";
                                    cell.style.fontWeight = "bolder";   
                                    asignCellClass(i, cell)
                                }
                                    
                            }
                    }
                })
                    visited[i] = true;
                }
            }
        }
        
        if(game.board.isBoardFull())
            displayWinner()

    }

    function filterWinningCells(cells)
    {
        // return an array flag that checks each cell for streaks and returns false for non continous cells
        // if only the isStreak function from board returned a boolean array instead of just one value I would have used that
        // this is required so that if we have a row like:
        //  x o x x x
        // we do not highlight all xs in the row just the last three
        let winningCells = cells.map((cell) => false);
        let currentToken = "";
        let previousToken = cells[0].textContent;
        winningCells[0] = true;
        let streak = 1;

        for(let i =1; i < cells.length; i++)
        {
            currentToken = cells[i].textContent;
            console.log(i,currentToken,previousToken)
                
            if (previousToken == currentToken)
            {
                winningCells[i] = true;
                streak++;
            } 
            else if (currentToken == "")
            {
                streak = 0;
                winningCells = cells.map((cell) => false);
            }
            else
            {
                // we could optimize to only check the values up to ith index but meh
                winningCells = cells.map((cell) => false);
                winningCells[i] = true;
                streak = 1;
            }
            
            previousToken = currentToken;
            // console.log(winningCells, previousToken)            
            // console.log("strreak is", streak)
            if(streak == gridConditionWin)
                return winningCells
        }
    }

    function addGradient(cell, path)
     {
        const gradient = `linear-gradient(${path}, transparent, transparent 49%, gray 49%, gray 51%, transparent 51%, transparent)`
        const validBackgrounds = cell.style.background;
        cell.style.background = [validBackgrounds, gradient].filter((g)=> g && g !=="none").join(", ");
    }

    function handleInterDiagonals(posIndex, cell)
    {
        //The diagonal cell gradient is given by the sign differences between first two cells on X and Y. I"ve found that
        //if the differences are both positive or negative the cells have major diagonal \ strikethrough and / (minor) otherwise.
        diagonalPositions = game.positions[posIndex];
        
        let [x0,y0] = diagonalPositions[0];
        let [x1,y1] = diagonalPositions[1];

        let deltaX = x1 - x0;
        let deltaY = y1 - y0; 
        
        switch(true)
        {
            case (deltaX > 0 && deltaY >0):
            case (deltaX < 0 && deltaY< 0):
                addGradient(cell, "to bottom left");
                break;
            default:
                addGradient(cell, "to bottom right");
                break;
        }   
    }

    function asignCellClass(posIndex, cell)   
      {
        if (posIndex < gridSize)
            addGradient(cell, "to bottom")
        else if (posIndex < 2 * gridSize)
            addGradient(cell, "to right")
        else if (posIndex == 2 * gridSize)
            addGradient(cell, "to bottom left")
        else if (posIndex == 2 * gridSize + 1)
            addGradient(cell, "to bottom right")
        else
            handleInterDiagonals(posIndex,cell);    
        return    
    }

    const assignPlayerWin = (cellRow) => {
        let result = cellRow.reduce((acc, curr) => acc + curr, 0)
        return result<0? p1 : p2
       }
    const getCellsFromCoords = function (coords) {
        let cells = []
        coords.forEach((coord) => {
            let attr = `[data-coords="${coord[0]},${coord[1]}"]`;
            let cell = document.querySelector(attr)
            cells.push(cell)
        })
        return cells
    }

    const getBoardValFromPos = function(posArray){
        let values = [];
        posArray.forEach((coords) =>(values.push(game.board.getBoard()[coords[0]][coords[1]])))
        return values;
    }
    function assignToken(i,j){
        //a token now is onlt assighned a color if it is part of a winning condition
        let attr = `[data-coords="${i},${j}"]`;
        let ele = document.querySelector(attr)
        const value = game.board.getBoard()[i][j];
        if (value == -1)
            ele.textContent = p1.getToken();
        else if (value == 1)
            ele.textContent = p2.getToken();
        else
            ele.textContent = "";

        ele.style.color = "gray";
        ele.style.fontWeight = "light";
    }

    function renderScene()
    {   
        main.textContent = "";    
        let gridSize = select.value;
        main.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
        main.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
        for (let i = 0; i<gridSize; i++)
            for(let j = 0; j<gridSize; j++)
            {
                const ele = document.createElement("div");
                const value = game.board.getBoard()[i][j];
                ele.classList = "cell"; 
                ele.setAttribute("data-coords", [i,j])            
                main.appendChild(ele);  
            }           
    }

    function displayWinner()
    {
        if(p1.getScore()> p2.getScore())
            ann.textContent = `${p1.getName()} wins`;
        else if (p1.getScore() == p2.getScore())
            ann.textContent = "Its a Draw!";
        else
            ann.textContent = `${p2.getName()} wins`;
    }

    function resetGame()
    {
        console.log("|reset")
        visited =  generateVisited()
        dislayTurn();
        gridSize = Number(select.value);
        let previous = game.getActivePlayer();
        winStreak = document.querySelector("input[name=grid-condition]:checked");
        gridConditionWin = Number(winStreak.value);
        
        //TODO find out why the gameLogic works when I do not have a selected player as the last argument
        game = GameLogic(gridSize,gridConditionWin, p1, p2); 
        p1.resetScore();
        p2.resetScore();
        displayScore();
        renderScene();
        
    }

    function onDivPlayerHover(e)
    {
        [i, j] = e.target.getAttribute("data-coords").split(",")
        console.log(game.getActivePlayer().getName())
        if (game.board.isValidMove(i,j))
        {
            e.target.textContent = game.getActivePlayer().getToken();
            e.target.style.color = "gray";
            e.target.style.fontWeight = "light";
        }
    };

    function onMouseOut(e)
    {   
        [i, j] = e.target.getAttribute("data-coords").split(",")
        if (game.board.isValidMove(i,j))
            e.target.textContent = "";
    }
    function displayScore(){
        
        
        const player1 = document.querySelector(".player-one");
        const player2 = document.querySelector(".player-two");
        player1.textContent = `${p1.getName()}: ${p1.getScore()}`;
        player2.textContent = `${p2.getName()}: ${p2.getScore()}`;
    };

    function dislayTurn()
    {
        ann.textContent = `${game.getActivePlayer().getToken()} turn`
    }

    function onPlayerTokenChange(){};
    function onPlayerTurnChange(){};

    main.addEventListener("click", clickHandler);
    main.addEventListener("mouseover", onDivPlayerHover)
    main.addEventListener("mouseout", onMouseOut)
    btn.addEventListener("click", resetGame);
    select.addEventListener("change", resetGame)

    const radio = document.getElementsByName("grid-condition");
    const tokens = document.getElementsByName("token");


    for(let i=0; i <radio.length; i++)
        radio[i].onclick = resetGame;

    for(let j=0; j <tokens.length; j++)
        tokens[j].onclick = game.switchPlayer;

}
    
GameController();