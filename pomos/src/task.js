 export default class Task {
    static lastKey = 0;
    
    static printKey(){
        return Task.lastKey;
    }
    
    #current;
    #key;

    constructor(name, pomodoros, notes = "")
    {
        this.#key = ++Task.lastKey;
        this.#current = 1;
        this.name = name;
        this.pomodoros = pomodoros;
        this.notes = notes;
        this.isWorkedOn = false;
        this.isFinished = false;
        
    };

    get key(){
        return this.#key;
    }

    get current() { return this.#current}

    increment(){
        if(this.#current+1 <= this.pomodoros)
            ++this.#current;
        
    }

    addPomodoros(val)
    {
        if(this.pomodoros+val > 0)
            this.pomodoros += val;
    };   

    print(){
        return `Name:${this.name} Pomodoros:${this.pomodoros} IsWorkedOn:${this.isWorkedOn} IsFinished:${this.isFinished} Notes:${this.notes}`        
    }

}


console.log("hi i, a task")

