function Board (gridSize, winCondition)
{

    console.log("GridWinCohnditiohn insidcwe boardd is ",winCondition)
    // Convert to number all that you capture from the web
    const board = [];
    const gridCondition =winCondition;

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
    
    function checkSecond()
    {
    /*
    The algorithm will go trhough the first and the last column. 
    On each column it will iterate twice, once from top and second time from bottom n times. On 
    It will  parse right, up & down and then left, up & down
    */
        diagonals = [];
        n = (gridSize-3); // number of diagonals per side

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

                leftTop.push(board[i][j]);
                leftBot.push(board[gridSize-i-1][j]);
                rightTop.push(board[gridSize-1-i][k]);
                rightBot.push(board[i][k]);
                j++;
                k--;
            }      
            diagonals.push(leftTop);
            diagonals.push(leftBot);
            diagonals.push(rightTop);
            diagonals.push(rightBot);
        }

        return diagonals.map((arr) => isStreak(arr));
    }

    function isBoardFull() {
        
        return board.flat().map(((cell) => cell == 0)).every((v)=> v ==false)

    }

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
    function getSecondaryPositions()
    {
        // repeating code but we need 
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
            secondaryPositions.push(leftTop);
            secondaryPositions.push(leftBot);
            secondaryPositions.push(rightTop);
            secondaryPositions.push(rightBot);
        }

        return secondaryPositions;
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
        const main = getMainPositions();
        const second = getSecondaryPositions();
        const positions = [...main, ...second]
        return positions
    }

    return {getBoard, getState, addToken, isValidMove, isStreak, getPositions, checkMain, checkSecond,isBoardFull};

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

    return {getName, getValue, addScore, getScore, getToken} 
}

function GameLogic (gridSize,gridCondition, p1, p2)
{
    let turn = true;
    let state = [];

    const board = Board(gridSize, gridCondition);
    const positions = board.getPositions();

    const print =  () => console.table(board.getBoard());
    const getActivePlayer = () => {return turn? p1 : p2};
    const getState =  () =>  {return state}
    const switchPlayer =()=> {console.log("switcvh was triggred")
        turn =! turn}

    function playRound (i,j)
    { 
        let success = board.addToken( getActivePlayer(), i, j);        
        if (success)
        {
            switchPlayer();
            const main = board.checkMain();
            const second = board.checkSecond();
            state = [...main, ...second];

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
    console.log(winStreak.value);
    
    let win = false;
    let gridSize = Number(select.value);
    let gridConditionWin = Number(winStreak.value);
    
    p1 = Player("Vasile", "X");
    p2 = Player("Ambrozie", "O");
    game = GameLogic(gridSize,  gridConditionWin,  p1, p2);
    const generateHighlights = () => game.positions.map((pos) => false);
    renderScene();

    let highlights =  generateHighlights()// keeps track of grids that have been 
    ann.textContent = `${game.getActivePlayer().getToken()} turn`
    
    
    function clickHandler(e) 
    {              
        [i, j] = e.target.getAttribute("data-coords").split(",")
        if(!game.board.isBoardFull())
        {
            success = game.playRound(Number(i), Number(j))

            if(success)
                assignToken(i,j)
            else
                return
            state = game.getState();
            
            console.log(state)
            console.table(game.board.getBoard())
            
            for(let i = 0; i<state.length; i++)
            {
                if(state[i] == true)
                {
                    
                    
                    console.log("het")
                    const arr = game.positions[i];
                    // console.log("arr is", arr);

                    cells = getCellsFromCoords(arr)
                    val = getBoardValFromPos(arr);
                    console.log(cells.map((cell)=>cell.textContent))
                    // console.log(val)
                    player =  assignPlayerWin(val)
                    if(!highlights[i])
                        player.addScore();
                    displayScore();
                
                    cells.forEach((cell)=> 
                    {
                        if(cell.textContent == player.getToken())
                            {
                                //Instead of hnihglihgts we cvan also do with states but they need to get out of game logic
                            if(!highlights[i]) // we check to see if a win was registered prior as we do not want to highlight the same cells again    
                            {

                                cell.style.color= cell.textContent == "X" ? "#135e99" : cell.textContent == "O" ? "#ed1a6a" : "";
                                cell.style.fontWeight = "bolder"
                            }
                    }})
                    highlights[i] = true;
                    
                }
            }
        }
        

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
            // ele.setAttribute("data-coords", [i,j])
        })
        return cells
        // 
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
        // console.log(positions)
        
        main.textContent = "";    
        let gridSize = select.value;
        main.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
        main.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
        for (let i = 0; i<gridSize; i++)
            for(let j = 0; j<gridSize; j++)
            {
                const ele = document.createElement("div");
                const value = game.board.getBoard()[i][j];
                // console.log(value)
                // console.log("Value is:;", value);
                ele.classList = "cell"; 
                ele.setAttribute("data-coords", [i,j])
                // ele.datakey = [i,j]; 
                // if (value == -1)
                //     ele.textContent = p1.getToken();
                // else if (value == 1)
                //     ele.textContent = p2.getToken();
                // else
                //     ele.textContent = "";
                // ele.style.color= ele.textContent == "X" ? "#135e99" : ele.textContent == "O" ? "#ed1a6a" : "";
            
                main.appendChild(ele);  
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

    function resetGame()
    {
        win = false;
        highlights =  generateHighlights()
        ann.textContent = `${game.getActivePlayer().getToken()} turn`
        gridSize = Number(select.value);

        winStreak = document.querySelector("input[name=grid-condition]:checked");
        let gridConditionWin = Number(winStreak.value);
        console.log(gridConditionWin)
        game = GameLogic(gridSize,gridConditionWin, p1, p2);

        renderScene();
        GameController() 
    }

    function onDivPlayerHover(e)
    {
        [i, j] = e.target.getAttribute("data-coords").split(",")
        // console.log(Number(i), Number(j))   
        // data = e.target.datakey;
        // const coords
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