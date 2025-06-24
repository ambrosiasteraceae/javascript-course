
class Node{
    constructor(){
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList{
    constructor(list){
        this.build(list);
        this.size = this.getSize();
    
    }

    build(list){
        this.node = new Node();
        this.node.value = list[0];
        
        let previous = this.node;
        for(let i = 1; i < list.length; i++)
        {
            let current = new Node()
            current.value = list[i];
            previous.nextNode = current;
            previous = current;
        }

    }

    append(value){

        const newNode = new Node();
        newNode.value = value;
        this.tail.nextNode = newNode;        
    }

    prepend(value){
        const newNode = new Node();
        newNode.value = value;
        newNode.nextNode = this.node;
        this.node = newNode;
    }

    getSize(node = this.node, count = 1){
        if(node.nextNode != null)
            return this.getSize(node.nextNode, ++count)
        return count
    }

    get head(){
        return this.node
    }

    get tail(){
        return this.traverse()
    }

    pop(node = this.node){
        if(node.nextNode.nextNode == null)
        {
            const poppedNode = node.nextNode;
            node.nextNode = null;
            return poppedNode;
        }
        return this.pop(node.nextNode)
        
    }


    contains(value, node = this.node){    
        if(node.value == value)
            return true
        else if(node.nextNode != null)
            return this.contains(value, node.nextNode) 
        else
            return false
    }
    
    find(value, node = this.node,  index = 0){
        if(node.value == value)
            return index
        else if(node.nextNode != null)
            return this.find(value, node.nextNode, ++index)
        else
            return null
    }


    getNodeAtIndex(index, node = this.node, currIdx = 0){
        if(index == currIdx)
            return node
        else if (node.nextNode!= null)
            return this.getNodeAtIndex(index, node.nextNode, ++currIdx)
        else
        {
            console.error("Index out of range")
            return null
        }
    }

    insertAt(value, index){
        //cut the nodes
        if(index == 0)
            return this.prepend(value)

        const leftSide = this.getNodeAtIndex(index-1);
        const temp = leftSide.nextNode;
        const newNode = new Node();
        newNode.value = value;
        leftSide.nextNode = newNode;
        newNode.nextNode = temp;
    }
    
    removeAt(index){
        const leftSide = this.getNodeAtIndex(index-1)
        const rightSide = this.getNodeAtIndex(index+1)
        leftSide.nextNode = rightSide;



    }

    traverse(node = this.node){
        if(node.nextNode != null)
            return this.traverse(node.nextNode)
        return node

    }

    toString(node = this.node, string = ""){
        let s = string + `( ${node.value} ) -> `; 
        if(node.nextNode != null){ 
            return this.toString(node.nextNode, s)}
        else
            return s + "null"

    }
}

const ll = new LinkedList([15, 1,2 ,4, 7, 9])


// CONTAINS TESTS
// console.log(ll.contains(1))
// console.log(ll.contains(4))
// console.log(ll.contains(101))
// console.log(ll.contains(9))
//FIND TESTS
// console.log("*******")
// console.log(ll.find(5))
// console.log(ll.find(2))
// console.log(ll.find(9))
// console.log(ll.find(5))
// ll.pop()

console.log(ll.toString())

ll.insertAt(21, 5)
console.log(ll.toString())


ll.removeAt(2)
console.log(ll.toString())

ll.removeAt(4)
console.log(ll.toString())



// ll.pop()
// ll.pop()
// console.log(ll.toString())
// // console.log(ll.node)
// console.log(ll.node.nextNode);
// console.log(ll.node.nextNode.nextNode);
// console.log(ll.node.nextNode.nextNode.nextNode);
// console.log(ll.node.nextNode.nextNode.nextNode.nextNode);
// console.log(ll.traverse())
// console.log(ll.toString())
// console.log(ll.string)

// console.log(ll.toString())
// console.log("head is ", ll.head)
// console.log("tail is", ll.tail)


// ll.append(81);
// ll.prepend(15);


// console.log("Before pop")
// console.log(ll.toString())

// console.log("popped item is " , ll.pop())
// console.log("After pop")
// console.log(ll.toString())


