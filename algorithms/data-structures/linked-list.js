import { mergeSort } from "../recursive";

class Node{
    constructor(){
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList{
    constructor(list){
        this.list =  []
        let previous = new Node();
        previous.value = list[0]
        this.list.push(previous)
        for(let i = 1; i < list.length; i++)
        {
            console.log(i)
            let current = new Node()
            current.value = list[i];
            previous.nextNode = current;
            previous = current;
            this.list.push(current)
        }
    }
    toString(){
        let printString = "";
        this.list.forEach((node)=>{
          printString += `${node.value} -> `
        })
        printString +=" null"
        console.log(printString);
    }
}

const ll = new LinkedList([1,2,4,5])
console.log(ll.list);
ll.toString()