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
        this.#current = 0;
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

        if(this.isFinished)
            return
         
        ++this.#current;

        if(this.#current >= this.pomodoros)
            this.isFinished = true;
    }

    addPomodoros(val)
    {
        /*
        There are two kinds of scenario that I want to allow
        1. User adds more pomodoros after a task is finished say 5/5. When added, isFinished should be set to false
        2. User estimated more pomodoros than actual. He should be able to remove pomodoros and set task to finished.  
        */
        const change = this.pomodoros + val;
        
        //you should not be able to substract below the current task number;
        if (change >= this.#current) 
        {
            this.pomodoros = change;
            
            if (this.pomodoros == this.#current)
                this.isFinished = true;
            else
                this.isFinished = false;    
        }
        else
            console.log("Hey you want to substract more than current", val)
        
    };   

    print(){
        console.log(`#${this.#key}:${this.name} ${this.#current}/${this.pomodoros} Active:${this.isWorkedOn} Finished:${this.isFinished}`)        
    }

}
