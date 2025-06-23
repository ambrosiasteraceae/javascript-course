// import { mergeSort } from "../recursive";


class Node{
    constructor(){
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList{
    constructor(list){
        this.build(list);
    
    }

    traverse(node = this.node){
        if(node.nextNode != null)
            return this.traverse(node.nextNode)
        return node

    }

    get head(){
        return this.node
    }

    get tail(){
        return this.traverse()

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

//uses this attributes
    // toString(node = this.node){
    //     if(node.nextNode != null){
    //         this.string += `(${node.value}) -> `
    //         this.toString(node.nextNode)}
    //     else       
    //         this.string +=`(${node.value}) -> null`
    // }

    toString(node = this.node, string = ""){
        let s = string + `(${node.value}) -> `; 
        if(node.nextNode != null){ 
            return this.toString(node.nextNode, s)}
        else
            return s + "null"
    
    }
}

const ll = new LinkedList([1,2,4,5])
// console.log(ll.node)
// console.log(ll.node.nextNode);
// console.log(ll.node.nextNode.nextNode);
// console.log(ll.node.nextNode.nextNode.nextNode);
// console.log(ll.node.nextNode.nextNode.nextNode.nextNode);
// console.log(ll.traverse())
// console.log(ll.toString())
// console.log(ll.string)

console.log(ll.toString())
console.log("head is ", ll.head)
console.log("tail is", ll.tail)

ll.append(7);
console.log(ll)
console.log(ll.toString())

ll.prepend(7);
console.log(ll)
console.log(ll.toString())
