
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
    
    levelOrderI(callbackFn){

        if(!callbackFn)
            throw new Error("U have not provbided a fucntuions")

        const queue = new Queue()
        const traversal = []

        queue.enque(this.root)

        while(queue.list.length != 0)
        {
            const node = queue.deque() 
            if(!node) continue;
            // console.log("callback fn is", callbackFn)
            callbackFn(node)
             
            traversal.push(node.value)

            if(node.left) queue.enque(node.left)
            if(node.right) queue.enque(node.right)            
        }
        
    return traversal
    }

    preOrder(node = this.root, values = []){
        values.push(node.value)
        if(node.left) this.preOrder(node.left, values)
        if(node.right) this.preOrder(node.right, values)
        return values
    }

    postOrder(node = this.root, values = []){
        if(node.left) this.postOrder(node.left,values)
        if(node.right) this.postOrder(node.right, values)
        values.push(node.value)
        return values        
    }


    inOrder(node = this.root, values=[]){
        if (node.left) this.inOrder(node.left, values)
        values.push(node.value)
        if (node.right) this.inOrder(node.right, values)
        return values        
    }

    findOld(value = null, node = this.root, valueFound = null ){
        //I forgot to return the valueFound in the
        if(!node) return null
        if(node.value == value) return node;
        if(node.left){
            valueFound = this.findOld(value, node.left, valueFound)
            if( valueFound) return valueFound
        }
        if(node.right)
            valueFound = this.findOld(value, node.right, valueFound)    
        return valueFound

    }

    find(value, node = this.root, found = null)
    {
        // console.log(node.value)
        if(!node) return null
        if(value == node.value) return node
        if(value > node.value){
            let found = this.find(value, node.right)
            if (found) return found
        }
        else
            found = this.find(value, node.left)
        return found
        
    }

    height(value, node = null, vertical = 0){
        
        if(vertical == 0 ) 
            node = this.find(value)
        if(!node) return -1
        
        if(node.left) return this.height(value, node.left, ++vertical)
        if(node.right) return this.height(value,node.right,++vertical)
        return vertical

    }


    depth(value, node = this.root, count = -1, found = null){
        if(!node) return null
        if(value == node.value) return ++count
        if(value > node.value){
            let found = this.depth(value, node.right, ++count)
            if (found) return found
        }
        else
            found = this.depth(value, node.left, ++count, found)
        return found
    }
    balancingCheck(node){
        const left = node.left? this.height(node.left.value) : -1;
        const right = node.right? this.height(node.right.value): -1;
        if(Math.abs(left - right)>1)
        {
                // console.log("Caught the culpriht", node.value)
            this.balanced = false;
        }
        // console.log("left ^ rught", left, right, )
        // console.log()
    }
    
    isBalanced(){
        // this.levelOrderI(this.balancingCheck.bind(this))
        this.balanced = true;
        const queue = new Queue()
        queue.enque(this.root)
        while(queue.list.length != 0)
        {
            const node = queue.deque() 
            if(!node) continue;
            this.balancingCheck(node)
            if(node.left) queue.enque(node.left)
            if(node.right) queue.enque(node.right)            
        }
    return this.balanced        
    }


    rebalance(){
        const items = this.postOrder();
        const newTree = new BalancedSearchTree(items);
        this.root = newTree.root;
    }
}

const input0 = [1,2,3,4,5,6,7,8,9,10]
const input1 = [50, 30, 20, 40, 32, 34,36, 70, 60 ,65, 80, 75, 85]
const mm = new BalancedSearchTree(input0)

// console.log(prettyPrint(mm.root))
// mm.deleteItem(9)
// console.log(prettyPrint(mm.root))
// console.log("Is tree balanced?", mm.isBalanced());
// mm.rebalance(); 
// console.log(prettyPrint(mm.root)) 
// console.log("Is tree balanced?", mm.isBalanced());  

function testSuite(){
    const items = [];
    for(let i=0; i<100; i++){
        items.push(Math.floor(Math.random()*100));
    }
    console.log(items)
    const newTree = new BalancedSearchTree(items)
    console.log(prettyPrint(newTree.root))
    console.log(newTree.isBalanced())
    newTree.insert(120)
    newTree.insert(150)
    newTree.insert(130)
    newTree.insert(121)
    newTree.insert(180)
    newTree.insert(250)
    console.log("AFTER INSERTION")
    console.log(prettyPrint(newTree.root))
    console.log(newTree.isBalanced())
    newTree.rebalance();
    console.log("AFTER REBALANCE")
    console.log(prettyPrint(newTree.root))
    console.log(newTree.isBalanced())

}
testSuite();






// console.log(mm.inOrder(mm.root.left))
// console.log(mm.preOrder(mm.root.left))
// console.log(mm.postOrder(mm.root.left))
// console.log(mm.levelOrderI(findNode))

// console.log(mm.find(6))
// console.log(mm.find(2))
// console.log("***********DEPTH & HEGIHT*********\n\n")
// console.log(mm.depth(1))
// console.log(mm.height(5))




// const add5 = function(node){node.value += 5}
// console.log("***********LEVELORDER**********")
// console.log(prettyPrint(mm.root))
// console.log("level order is: " , mm.levelOrderI(add5));


// console.log("***********DEPTH FIRST TRAVERSAL*********")
// console.log("\n\n***********PREORDER**********\n\n")
// console.log("preOrder is:", mm.preOrder())
// // const k = 
// console.log("\n\n***********INORDER**********\n\n")
// console.log("inOrder is:", mm.inOrder() )
// console.log("\n\n***********POSTORDER**********\n\n")
// console.log("postOrder is:", mm.postOrder())


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
