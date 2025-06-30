class KnightTravails{
    constructor(){
        
        this.board = null;
        this.adjacencyList = this.generateAdjacencyList();
    }

    generateEdgeList(){}
    generateAdjacenyMatrix(){}
    generateAdjacencyList(){
        const adjacency = [];
        for(let i = 0; i<=7; i++)
        {
            const rows = []
            for(let j = 0; j<=7; j++){
                const moves = this.getValidPositions([i,j])
                rows.push(moves)
            }
        adjacency.push(rows)
        }
        return adjacency
            
    }

    shortestPath(source, target, path = []){
        
        
        path.push(source)
        
        //last indeces of the path array
        let row = path.at(-1)[0];
        let column = path.at(-1)[1];
        possibleMoves = this.possibleMoves([row,column])
        
        if(target[0] == row && target[1] == column)
            return path
        for(let move of possibleMoves)
            return this.shortestPath(move, target, path)
        return -1

        
    }

    getValidPositions(pos){
        let rowIndex, colIndex;
        [rowIndex, colIndex] = pos;
        let possibleMoves = []
        // for (let i = 0; i < 2; i++)
        //     for(let sign = 0; sign < 2; sign++)
        //     {
        //         console.log( (-1)**i*-2 , (-1)**sign)
        //     }
        
        // for (let i = 0; i < 2; i++)
        //     for(let sign = 0; sign < 2; sign++)
        //     {
        //         console.log( (-1)**i*-1 , (-1)**sign*2)
        //     }
        for (let i = 0; i < 2; i++)
            for(let j = 0; j<2; j++)
                for(let sign = 0; sign < 2; sign++)
                {
                    let iMove, jMove;
                    iMove = rowIndex + (-1) ** j * (2 - (1 * i));
                    jMove = colIndex + (-1) ** sign * (1 * (i+1));

                    if (iMove < 0 || iMove > 7 || jMove < 0 || jMove > 7)
                        continue
                    possibleMoves.push([iMove, jMove])

                    // console.log((-1)**j * (2 - (1 * i)), (-1) ** sign *(1*(i+1))) 
                    
                }
        return possibleMoves;
        
    }
}


const knight = new KnightTravails()
// console.log(knight.getValidPositions([2,1]))
// console.log(knight.adjacencyList)
