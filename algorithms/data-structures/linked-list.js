
class Node{
    constructor(value){
        this.value = value;
        this.nextNode = null;
    }
}
// Your size Property Is Frozen in Time
// Your append Breaks if List is Empty
// build() Assumes Non-Empty Array
// pop() Breaks for 0 or 1 Node
// General Style Could Be More Modular
// Performance: You Re-Traverse Too Much

/*
-> change node.value = value with newNode(value)
-> allow linkedlist to initialize empty
*/
export class LinkedList{
    constructor(){
        this.node = null;
        this.count = 0;
        // this.tail = null;
        // this.size = this.getSize();
    }


    build(list){
        this.node = new Node(list[0]);    
        let previous = this.node;
        for(let i = 1; i < list.length; i++)
        {
            let current = new Node(list[i])
            previous.nextNode = current;
            previous = current;
        }

    }

    append(value){

        if(this.node?.value == null){
            this.node = new Node(value)
            ++this.count;
            return
        }
        const newNode = new Node(value);  
        this.tail.nextNode = newNode;        
        ++this.count;
    }

    prepend(value){
        const newNode = new Node(value);
        // newNode.value = value;
        newNode.nextNode = this.node;
        this.node = newNode;
    }



    get head(){
        return this.node
    }

    get tail(){
        return this.traverse()
    }

    pop(node = this.node){
        if(node.nextNode == null)
        {
            this.node.value = null
            --this.count;
            return null
        }

        if(node.nextNode.nextNode == null)
        {
            const poppedNode = node.nextNode;
            node.nextNode = null;
            --this.count;
            return poppedNode;
        }
        return this.pop(node.nextNode)
        
    }


    contains(value, node = this.node){
        
        if(this.node?.value == null)
            return false  
         
        if(node.value.key == value)
            return true
        else if(node.nextNode != null)
            return this.contains(value, node.nextNode) 
        else
            return false
    }
    
    find(value, node = this.node,  index = 0){
        if(node.value.key == value)
            return node
        else if(node.nextNode != null)
            return this.find(value, node.nextNode, ++index)
        else
            return null
    }

    findIndex(key, node = this.node,  index = 0){
        if(node.value.key == key){
            return index
        }
        else if(node.nextNode != null)
            return this.findIndex(key, node.nextNode, ++index)
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
        const newNode = new Node(value);
        // newNode.value = value;
        leftSide.nextNode = newNode;
        newNode.nextNode = temp;
    }
    
    removeAt(index){
        //what is there is no left side?
        //what if there is only the root?
        //what if we remove from index  == 0?

        if(index == 0)
        {
            const rightSide = this.getNodeAtIndex(index+1)
            this.node = rightSide
            return
        }

        console.log("index is :", index)
        const leftSide = this.getNodeAtIndex(index-1)
        const rightSide = this.getNodeAtIndex(index+1)
        leftSide.nextNode = rightSide;



    }

    traverse(node = this.node){
        if(!node)
            return -1
        if(node.nextNode != null)
            return this.traverse(node.nextNode)
        // console.log(node.value)
        return node
    }

    getProperty(property = null, node = this.node, container = [], )
        {
            if(!node)
                return null
            if(node.nextNode != null){
                 container.push(node.value[property])
                 return this.getProperty(property, node.nextNode, container, )
            }
            container.push(node.value[property])
            return container
        }

    getEntries(node = this.node, container = []){     
           {
            if(!node)
                return null
            if(node.nextNode != null){
                 container.push(node.value)
                 return this.getEntries( node.nextNode, container, )
            }
            container.push(node.value)
            return container
        }}

    

    toString(node = this.node, string = ""){

        if(this.node?.value == null)
            return "(null) -> null"
        let s = string + `( ${node.value.key} : ${node.value.value}  ) -> `; 
        if(node.nextNode != null){ 
            return this.toString(node.nextNode, s)}
        else
            return s + "null"

    }
}

// const ll = new LinkedList()
// console.log(ll.count)
// ll.append(11)
// console.log(ll.toString())
// console.log(ll.count)
// ll.pop()
// console.log(ll.count)
// console.log(ll.toString())
// ll.append(12)
// ll.append(13)
// console.log(ll.count)
// console.log(ll.tail)
// console.log(ll.toString())
// ll.pop()
// ll.pop()
// console.log(ll.count)
// console.log(ll)
// ll.append(1)
// console.log(ll.count)
// console.log(ll.toString())
// console.log(ll.tail)

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



// ll.insertAt(21, 5)
// console.log(ll.toString())


// ll.removeAt(2)
// console.log(ll.toString())

// ll.removeAt(4)
// console.log(ll.toString())



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


