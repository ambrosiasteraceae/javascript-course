function Board (gridSize)
{
    // Convert to number all that you capture from the web
    const board = [];

    //Initialize board
    for (let i = 0; i < gridSize ; i++)
    {
        board[i] = [];
        // console.log(i)
        for (let j = 0; j<gridSize; j++)
            board[i].push(0);
    }

    const getBoard = () => board;
    
    const getState = () => board.map((cells) => cells.map((cell) => cell));

    const addToken = (player,i,j) => {
        // console.log(player.getName(),  player.cell.getValue())
        if (isValidMove(i,j))
            board[i][j] = player.getValue();
        else //We need to return in order for not to switch player turn  in case we do not add to the board
            return 0
        return 1
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
                // leftTop.push([i,j].join(""));
                // leftBot.push([gridSize-i-1,j].join(""));
                // rightTop.push([gridSize-1-i,k].join(""));
                // rightBot.push([i,k].join(""));
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
        
        // board.map((row,i) => row.map((cell, j) => console.log("mm")))
        // console.log(board.map((row) => row.map((cell) => cell!=0)))
        // return board.map((row) => row.map((cell) => cell!=0))

        return board.flat().map(((cell) => cell == 0)).every((v)=> v ==false)

    }


    function isValidMove(i,j) {
        //I do not check for index values less than 0 or higher than 3 because they will be part of dom manipulation
        //check to see if the value returned is != 0; if it is, then its occupied and is nnot valid
      
        if(board[i][j] != 0)
        {
            // console.log(`Row:${i} Column${j} is already taken. Please choose one of the available grid spaces.` )
            return false;
        }
        return true;
    };

    function isStreak(arr, gridCondition = 3)
    {
        // Whgat areyou goimng to do aginst zero rows & cols?
        // streak = false;
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

        /*
        Revision 2
            - can have multiple wins but cannot have multiple wins on same array
            - isStreak is called where?
        */

        //check rows
        const rows = board.map((row) => isStreak(row));

        // console.log("Row  is", rows);
        //check columns
        const columns = transpose().map((row) => isStreak(row));
        // const colresult = board[0].map((col, i) => board.map(row => row[i]).reduce((acc, curr) => acc + curr.getValue(), 0))
        // console.log("Column is", columns);

        //check main diag -> the resulting diagonnal only has one gridSize elements, not 4 gridSize arrays!!
        const major = isStreak(board
                        .map((row,i)=> { 
                            return row.filter((col, j) =>{
                                return i == j})[0];
                        }));
                        // .map((x) => isStreak(x));           
        //check minor diag 
        const minor = isStreak(board
                    .toReversed()
                    .map((row,i)=>{
                        return row.filter((col, j) => {
                            return i == j}
                        )[0]}));
                    // .map((row) => isStreak(row));
        // console.log("Secondary diag is", minor)

        states = [...rows, ...columns, major, minor];
        // console.log(states);
        // console.log(gridSize);
        // console.log(Number.isInteger(gridSize));
        // console.log(scores.includes(gridSize));
        // console.log(scores.includes(-gridSize));

        // console.log(board.map((row, i) => { 
        //     return row.filter((col, j) => col.getValue() == 0)
        // }).flat())
        return states
    }
    function getSecondaryPositions()
    {
        // repeating code but we need 
        secondaryPositions = [];
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
                // leftTop.push([i,j].join(""));
                // leftBot.push([gridSize-i-1,j].join(""));
                // rightTop.push([gridSize-1-i,k].join(""));
                // rightBot.push([i,k].join(""));
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
            row = []
            col = []
            // board[i] = [];
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
    // we map x and y's to -1 & 1
    let tokens = { "X":-1, "O":1};

    const getValue = () => tokens[_token]
    const getToken = () => _token;
    const getName = () => `${name.toUpperCase()}`;
    const addScore =  () => score++;
    const getScore = () => score;

    return {getName, getValue, addScore, getScore, getToken} 
}

function GameLogic (gridSize, p1, p2)
{
    let turn = true;
    const board = Board(gridSize);
    const positions = board.getPositions();

    // console.log("Game ihnitials")
    console.log(positions)
    // console.log(typeof(gridSize))

    const print =  () => console.table(board.getBoard());
    const getActivePlayer = () => {return turn? p1 : p2}

    function playRound (i,j)
    { 
        insert = board.addToken( getActivePlayer(), i, j);
        if (insert==1)
            turn =!turn;
           
        const main = board.checkMain();
        const second = board.checkSecond();

        const gamestate = [...main, ...second];
        // console.log(gamestate)

        return gamestate
    }
    return {playRound, print, board, getActivePlayer, positions}    
}

function GameController() 
{
    //Why should we choose to rerender the whole scene instead of just updating the board UI on each turn?
    //Since we are now rerendering we need to add the event handlrs either to the main or to the .cell divs everytime
    const main = document.querySelector(".main");
    const btn = document.querySelector(".reset"); 
    const ann = document.querySelector(".announcement"); 
    const select = document.querySelector("select");
    
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

    let win = false;
    let gridSize = Number(select.value);
    
    p1 = Player("Vasile", "X");
    p2 = Player("Ambrozie", "O");
    game = GameLogic(gridSize, p1, p2);
    renderScene();
    console.log(getCellsFromCoords(game.positions[11]))
    ann.textContent = `${game.getActivePlayer().getToken()} turn`


    function updateScene(){
        // let gridSize = select.value;
        // main.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
        // main.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
        for (let i = 0; i<gridSize; i++)
            for(let j = 0; j<gridSize; j++)
            {
                let attr = `[data-coords="${i},${j}"]`;
                let ele = document.querySelector(attr)
                const value = game.board.getBoard()[i][j];
                // console.log(value)
                // console.log("Value is:;", value);
                // ele.classList = "cell"; 
                // ele.setAttribute("data-coords", [i,j])
                // ele.datakey = [i,j]; 
                if (value == -1)
                    ele.textContent = p1.getToken();
                else if (value == 1)
                    ele.textContent = p2.getToken();
                else
                    ele.textContent = "";
                ele.style.color= ele.textContent == "X" ? "#135e99" : ele.textContent == "O" ? "#ed1a6a" : "";
    }}

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
                if (value == -1)
                    ele.textContent = p1.getToken();
                else if (value == 1)
                    ele.textContent = p2.getToken();
                else
                    ele.textContent = "";
                ele.style.color= ele.textContent == "X" ? "#135e99" : ele.textContent == "O" ? "#ed1a6a" : "";
            
                main.appendChild(ele);
  
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
        [i, j] = e.target.getAttribute("data-coords").split(",")
        // console.log(typeof(i), typeof(j))
        // console.log(game.board.getState())
        // console.log(game.board.isBoardFull())
        if(!game.board.isBoardFull())
        {
            
            state = game.playRound(Number(i), Number(j))
            
            // console.log(state)
            for(let i = 0; i<state.length; i++)
            {
                if(state[i] == true)
                {
                    const arr = game.positions[i];
                    console.log("arr is", arr);

                    cells = getCellsFromCoords(arr)
                    val = getBoardValFromPos(arr);
                    console.log(val)
                    player =  assignPlayerWin(val)
                    console.log(player.getName())
                    cells.forEach((cell)=>{
                        if(cell.textContent == player.getToken())
                            cell.style.fontWeight = "bolder"
                    })
                    updateScene();
                    return       
                }
            }
            updateScene();
            // renderScene();
           
        }
        return
        
        // if (!win)
        // {
        //     result = game.playRound(data[0],data[1]);
        //     game.print();
        //     console.log(game.board.getBoard()[0]);
        //     console.log(game.board.isStreak(game.board.getBoard()[0]));
        //     win = checkWinner(result);
        //     if(win)
        //         {
        //             game.getActivePlayer().addScore();
        //             displayScore();
        //             renderScene();
        //             cellIndeces = generateWincondition(result);
        //             console.log(cellIndeces);
        //             onPlayerWinHighlight(cellIndeces);
                    
        //             return
        //         }     
        // renderScene();

        // }
    }

    function resetGame()
    {
        win = false;

        ann.textContent = `${game.getActivePlayer().getToken()} turn`
        gridSize = Number(select.value);
        game = GameLogic(gridSize, p1, p2);

        renderScene();
        
    }

    function onDivPlayerHover(e)
    {
        [i, j] = e.target.getAttribute("data-coords").split(",")
        // console.log(Number(i), Number(j))   
        // data = e.target.datakey;
        // const coords
        // if (game.board.isValidMove(data[0], data[1]))
        // {
        //     e.target.textContent = game.getActivePlayer().getToken();
        //     e.target.style.color = "gray";
        //     e.target.style.fontWeight = "light";
        // }
    };

    function onMouseOut(e)
    {   
        data = e.target.datakey;
        if (game.board.isValidMove(data[0], data[1]))
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
            if(indeces?.includes (i))
                cells[i].style.fontWeight = "bolder"
            else
                cells[i].style.color = "gray"
    
            // console.log( cells[indeces[i]])
        }
     
    };


    main.addEventListener("click", clickHandler);
    main.addEventListener("mouseover", onDivPlayerHover)
    main.addEventListener("mouseout", onMouseOut)
    btn.addEventListener("click", resetGame);
    select.addEventListener("change", resetGame)
 
    
}
    
GameController();