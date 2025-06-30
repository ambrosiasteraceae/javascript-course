import { Queue } from "./balanced-search-tree.js";

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

    shortestPath(source, target){
        let path = [];
        let move = source;
        let queue = new Queue();
        while(move[0] != target[0] || move[1]!= target[1]){
            path.push(move);
            let possibleMoves = this.getValidPositions(move);
            let isContained = possibleMoves.filter((value)  =>( target[0] == value[0] && target[1] == value[1]))
            // console.log(possibleMoves)
            if(isContained.length == 1)
            {
                console.log("hey I interened")
                path.push(isContained[0])
                console.log(path)
                break 
            }
            for(let pos of possibleMoves)
                queue.enque(pos)
            move = queue.deque()

            //we search but seach what?
        }

        // checkAdjacencyList(value){
            
        // }
        
    }

    getShortestPathRecursive(move,path,target ){
        path.push(move);
        let row = path.at(-1)[0];
        let column = path.at(-1)[1];
        move = this.getValidPositions()
        if(target[0] == row && target[1] == column)
            return path
        return this.shortestPath(move, target, path)

    }

    getValidPositions(pos){
        let rowIndex, colIndex;
        [rowIndex, colIndex] = pos;
        let possibleMoves = []

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

                }
        return possibleMoves;
        
    }
}


const knight = new KnightTravails()
// console.log(knight.getValidPositions([2,1]))
// console.log(knight.adjacencyList)
console.log(knight.shortestPath([0,0], [7,4 ]))

