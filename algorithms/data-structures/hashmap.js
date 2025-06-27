// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }


import { LinkedList } from "./linked-list.js";

class HashMap{
    constructor()
    {
        this.loadFactor = .75;
        this.capacity = 16;
        this.init()
        this.length = 0;
    }

    init(){
        this.bucket = [];
        for(let i = 0; i < this.capacity; i++)
            this.bucket.push(new LinkedList())
    }
    
    grow(){
        if(this.length >= this.capacity*this.loadFactor)
        {
            console.log("Old capacity was:", this.capacity, "new capacity", this.capacity*2)
            for(let i = this.capacity; i < this.capacity * 2; i++)
                this.bucket.push(new LinkedList())
            this.capacity = this.capacity * 2
        }
        return
    }

    hash(key){
        let hashCode = 0;
        const primeNumber = 17;
        for(let i = 0; i< key.length; i++)
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
        return hashCode  % this.capacity
    }

    remove(key){
        if(this.has(key))
        {
            const hash = this.hash(key);
            const nodeIndex = this.bucket[hash].findIndex(key)

            this.bucket[hash].removeAt(nodeIndex);
            --this.length;
            return true
        }
        return false

    }

    has(key){
        const hash = this.hash(key)
        return this.bucket[hash].contains(key)
    }

    set(key, value){
        this.grow()
        const hash = this.hash(key);
        const bucket = this.bucket[hash];

        if(!bucket.contains(key)){
            bucket.append({"key": key, "value":value})
            ++this.length;
        }

        else
        {
            const node = bucket.find(key)
            node.value.value = value;
        }
        return
    }

    print(){
        for(let i = 0; i < this.capacity; i++)
            console.log(this.bucket[i].toString());
    }

    clear(){
        for(let i = 0; i < this.capacity; i++){
            while(this.bucket[i].node?.value != null)
                this.bucket[i].pop()
        }
        this.length = 0;
    }
    keys(){

        const keys = [];
        for(let i = 0; i < this.capacity; i++){
            const nodeKeys = this.bucket[i].getProperty("key") 
            if(nodeKeys?.length > 0)
                keys.push(...nodeKeys)
        }
        return keys
    }

    values(){

        const values = [];
        for(let i = 0; i < this.capacity; i++){
            const nodevalues = this.bucket[i].getProperty("value") 
            if(nodevalues?.length > 0)
                values.push(...nodevalues)
        }
        return values
}
    entries(){

        const entries = [];
        for(let i = 0; i < this.capacity; i++){
            const nodeEntries = this.bucket[i].getEntries() 
            if(nodeEntries?.length > 0)
                entries.push(...nodeEntries)
        }
        return entries
    }
}

const test = new HashMap();
// test.print()
 test.set('apple', 'red')
//  console.log(test.has("apple"));
 
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')

console.log("\n--------------Before KEY REMOVAL --------------- \n")
test.print();
// test.remove("jacket")
console.log("\n--------------On KEY REMOVAL ---------------\n")
// console.log("Was removal succesfull?" , test.remove("banana"))
// test.remove("jacket")
test.remove("grape")
test.print();


console.log("--------------On traversal KEYS---------------")
console.log(test.keys())
console.log("--------------On traversal VALUES---------------")
console.log(test.values())
console.log("--------------On traversal ENTRIES---------------")
console.log(test.entries())


console.log("--------------BEFORE DLEETUON---------------")
test.print();
console.log("---------------AFTER LDELETION-------------")
test.clear()
test.print()
test.print()

console.log("Test size is:., ", test.length)
test.set('moon', 'silver')
console.log("Test size is:., ", test.length)
test.print();

 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')

test.print()
