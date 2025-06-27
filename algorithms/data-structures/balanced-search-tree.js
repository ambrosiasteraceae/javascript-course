
import {Node, prettyPrint } from "./index.js";


class Queue{
    constructor(){
        this.list = []
    }
    
    enque(value){
        this.list.push(value)
    }
    deque(){
        return this.list.shift();
    }
}



class BalancedSearchTree{
    constructor(array){
        this.sorted = this.initialize(array)
        this.root = this.buildTree(this.sorted);
    }
    initialize(array){
        const unique = [...new Set(array)]
        const sorted = unique.sort((a,b)=> (a - b))

        return sorted
    }
    buildTree(array, node = null,){
        //TODO: we need a better method rather than slicing.
        
        let mid = Math.floor(array.length/2)
        let value = array[mid]
        if(value == undefined)
            return node
        node = new Node(value) 
        if(array.length <= 1)
            return node
        node.left = this.buildTree(array.slice(0, mid), node.left)
        node.right =  this.buildTree(array.slice(mid+1), node.right)
        return node

    }

    insert(value, node = this.root){
        if(node.value < value)
        {
            if(node.right)
                this.insert(value, node.right)
            else
                node.right = new Node(value)
        }
        else
        {
            if(node.left)
                this.insert(value, node.left)
            else
                node.left = new Node(value)
        }
    }

    find(value, node = this.root){

        //returns the node 
        if(!node)
            return -1

        if (node.value == value)
            return node
        //search left   
        if(node.value < value)
            return this.find(value, node.right)
        //search right
        else 
            return this.find(value, node.left)
        
    }

    getParent(value, node = this.root){
        //TODO: handle non node.value inputs. 

        if(value == this.root.value)
            return null
        if( value == node?.right?.value)
            return node
        if (value == node?.left?.value )
            return node

        if (node.value > value)
            return this.getParent(value, node.left)
        else if(node.value < value)
            return this.getParent(value, node.right)
        else
            return -1
    }
    
    deleteItem(value){
        
        const node = this.find(value);
        console.log("thisdeleted node is:", node.value)
        const parent = this.getParent(value);
        if(node == -1)
            return 

        const expr = (!!node.left + !!node.right) + 1
        console.log("Case is:" , expr)
        switch(expr){
            case 1:
                if(value < parent.value)
                    parent.left = null;
                else
                    parent.right = null;
                break;
            //case2
            //a node with 1 child -> make the child point to the deleted node parent
            case 2:
                //first check to see which  side of the parent node should we do.
                
                // we play on right side of parent
                if(node.value > parent.value)
                    parent.right = node.left ? node.left : node.right
                else
                    parent.left = node.left  ? node.left : node.right
                break;
            case 3:
                const replacement = this.getMaxRight(node.right);
                const replacementParent = this.getParent(replacement.value);
                node.value = replacement.value;

                if(replacement.value < replacementParent.value)
                    replacementParent.left = null;
                else
                    replacementParent.right = null;
            }
    }

    getMaxRight(node){
        if (node.left != null)
            return this.getMaxRight(node.left)
        return node    
        //IMMEDIATELY TO THE RIGHT FOR A NODE WITH JUST A CHILD LEFT AND A CHILD RIGHT NO SUBSCVH


    }

/*
        ┌── 85
│       │   
│   ┌── 75
│   │   │   
│   │   └── 65
│   │      
└── 50
    │   ┌── 40
    │   │   
    └── 34
        │  
        └── 30
 
*/
    levelOrderI(callbackFn){

        if(!callbackFn)
            throw new Error("U have not provbided a fucntuions")

        const queue = new Queue()
        const traversal = []
        
        queue.enque(this.root)
        while(queue.list.length != 0)
        {
            if(traversal.length == 0)
            {   
                var node = queue.deque()
                callbackFn(node)
                traversal.push(this.root.value);
            }
            // console.log(queue)
            //traverse left
            if(node?.left){
                callbackFn(node.left)
                queue.enque(node.left)
            }
            //traverse right
            if (node?.right){
                callbackFn(node.right)
                queue.enque(node.right)    
            }
            
            node = queue.deque()
            traversal.push(node.value)
            // console.log(traversal)
            
        }
        
    return traversal
    }

    inOrder(){}
    preOrder(){}
    postOrder(){}
    get height(){}
    get depth(){}
    isBalanced(){}
    rebalance(){}
}
const input0 = [1,2,3,4,5,6,7]
const input1 = [50, 30, 20, 40, 32, 34,36, 70, 60 ,65, 80, 75, 85]
const mm = new BalancedSearchTree([50,34,30,45,51])

const add5 = function(node){node.value += 5}

console.log(prettyPrint(mm.root))
console.log("level order is: " , mm.levelOrderI(add5));

/*
│       ┌── 85
│       │   └── 80
│   ┌── 75
│   │   │   ┌── 70
│   │   └── 65
│   │       └── 60
└── 50
    │   ┌── 40
    │   │   └── 36
    └── 34
        │   ┌── 32
        └── 30
            └── 20
*/

// console.log(mm.find(20))
// mm.deleteItem(20)

//DELETION case 1
// console.log  ("Parent is: ", mm.getParent(70)?.value)
// mm.deleteItem(70)
// mm.deleteItem(20)
// mm.deleteItem(36)
// mm.deleteItem(60)
// console.log("****************")
// mm.deleteItem(80)
// console.log(prettyPrint(mm.root))
// console.log("****************")
// mm.deleteItem(32)
// mm.deleteItem(30)
// mm.deleteItem(40)
// mm.deleteItem(85)
// mm.deleteItem(65)

// mm.deleteItem(85)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.deleteItem(34)
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))


// mm.deleteItem(75)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))


// mm.deleteItem(65)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.deleteItem(36)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.deleteItem(40)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.deleteItem(50)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.deleteItem(4)
// // console.log(mm.getParent(75))
// console.log("After Deletion")
// console.log(prettyPrint(mm.root))

// mm.insert(41)
// mm.insert(42)
// mm.insert(19)
// mm.insert(86)
// console.log(prettyPrint(mm.root))
