 
//@TODO: Check the task functionality as the lastkey has been updated to start at 0 
//in order to index more naturally into the tasks array.
 
 export class Task {
    static lastKey = -1;
    
    static printKey(){
        return Task.lastKey;
    }
    
    #current;
    #key;

    constructor({name, pomodoros, notes =""}, timer)
    {
        this.#key = ++Task.lastKey;
        this.#current = 0;
        
        this.name = name;
        this.pomodoros = pomodoros;
        this.notes = notes;
        
        this.isActive = false;
        this.isFinished = false;
        
        this.timer = timer;
        
    };


    isPomodoroFinished(){
        if (this.timer == 0)
            this.increment();
    }


    get key(){
        return this.#key;
    }

    get current() { return this.#current}

    increment(){

        if (this.isFinished)
        {
            console.log(`Cannot add more it is full, ${this.#current}:${this.pomodoros}`)
            return
        }
        
        if (this.timer.duration = 0)
        {
            console.log("Timer is not yet finished. cannot assign")
            return
        }
        
        console.log("Incrementing Task since time is finished")
        ++this.#current;

        if(this.#current >= this.pomodoros)
        {
            this.isFinished = true; 
            // this.tim
        }
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
        if (change >= this.#current + 1) 
        {
            this.pomodoros = change;
            
            if (this.pomodoros == this.#current + 1)
                this.isFinished = true;
            else
                this.isFinished = false;    
        }
        else
            console.log("Hey you want to substract more than current", val)
        
    };   

    print(){
        console.log(`#${this.#key}:${this.name} ${this.#current}/${this.pomodoros} Active:${this.isActive} Finished:${this.isFinished}, Time:${this.timer.getTime()}`)        
    }

}
