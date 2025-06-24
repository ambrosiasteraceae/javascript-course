import { prettyPrint } from "./index.js";
import { Node } from "./index.js";


class BinarySearchTree{
 constructor(array){
   
   this.root = new Node(array[0])
   this.buildTree(array, this.root)
  }

  buildTree(inputArray, node, index = 1){
    
    if(inputArray.length == 1)
        return node
    if(index == inputArray.length)
        return node

    //go right
    if(inputArray[index] > node.value)
    {    
        if(node.right)
            return this.buildTree(inputArray, node.right, index)
        node.right = new Node(inputArray[index])
        ++index;   
    }
    
    //go left
    else{
        if(node.left)
            return this.buildTree(inputArray, node.left, index)
        node.left = new Node(inputArray[index])
        ++index;
    }
    
    return this.buildTree(inputArray, this.root, index)

  } 

  print(node = this.root){
    
    // console.log("node and rootva;s", node.value, this.root.value)
    if(node.value == this.root.value)
        console.log(this.root.value)

    if (node.right!=null)
        this.print(node.right)
    if(node.left!=null)
        this.print(node.left)
    else
        console.log(node.value)
}
}

const tree = new BinarySearchTree([2, -1, 1,0,3,4,-7, 8,5, 6, -2,  ])
// console.log("Root node is:", tree)
// tree.print()


prettyPrint(tree.root)

//create rootNode
//create currentNode indx = 1
//if value higher than node -> go right
//else -> go left
//for each value from the array, we need to enter recursion again


/*
- how do you go right?
- how do you go left?
- how do you ensure the recursion navigation?
- how do we ensure we always recurse from the rootNode everytime a new index from numberList is being read?
-
*/
