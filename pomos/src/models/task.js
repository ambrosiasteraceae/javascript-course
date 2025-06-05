 
//@TODO: Check the task functionality as the lastkey has been updated to start at 0 
//in order to index more naturally into the tasks array.

class Tuple extends Array{
    constructor(...args){
        super();
        this.push(...args);
        Object.seal(this);
    }
}
 export class Task {

    static clone(jsonObj, timer, cloned = true){
        const task = new Task(jsonObj, timer, cloned);
        task._key = jsonObj._key
        task._current = jsonObj._current;   
        task.isActive = jsonObj.isActive;
        task.isFinished = jsonObj.isFinished;        
        task.timestamps = jsonObj.timestamps;
        return task;
    }

    static lastKey = -1;
    
    static printKey(){
        return Task.lastKey;
    }
    
    // #current;
    // #key;

    constructor({name, pomodoros, notes =""}, timer, cloned = false)
    {
        if(!cloned)
            this._key = ++Task.lastKey;

        this._current = 0;   
        this.name = name;
        this.pomodoros = Number(pomodoros);
        this.notes = notes;        
        this.isActive = false;
        this.isFinished = false;        
        this.timer = timer;
        this.timestamps = this.generateTimeStampArr(this.pomodoros);

    };

    startTimer(){
        this.timer.start();
        this.assignStartDate();
    }

    generateTimeStampArr(length){
        const timestamps = [];
        for(let i = 0; i < length; i++)
        {
            let ts = new Tuple(null,null);
            timestamps.push(ts);
        }
        return timestamps;
    }

    assignStartDate(){
        this.timestamps[this._current][0] = this.timer.startedAt;
    }

    assignEndDate(){
        // console.log(this.timer.finishedAt)
        // if(this.timer.finishedAt)
        //     console.warn("this timer does not have a finished date")
        // console.log(1);
        this.timestamps[this._current][1] = this.timer.finishedAt;
    }

    isPomodoroFinished(){
        if (this.timer == 0)
            this.increment();
    }


    get key(){
        return this._key;
    }

    get current() { return this._current}

    increment(){

        if (this.isFinished)
        {
            
            console.log(`Cannot add more it is full, ${this._current}:${this.pomodoros}`)
            return
        }
        
        if (!this.timer.duration == 0)
        {   
            // console.log(this.timer.duration);
            console.log("Timer is not yet finished. cannot assign")
            return
        }
        
        console.log("Incrementing Task since time is finished")
        console.log(this);
        ++this._current;
        if(this._current >= this.pomodoros)
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
        if (change >= this._current) 
        {

            this.pomodoros = change;
            if (val > 0)
            {
                const tArray = this.generateTimeStampArr(val);
                this.timestamps = this.timestamps.concat(tArray);
            }
            else
                this.timestamps = this.timestamps.toSpliced(this._current+1, -val);

            if (this.pomodoros == this._current)
                this.isFinished = true;
            else
                this.isFinished = false;    
        }
        else
            console.log("Hey you want to substract more than current", val)
        
    };   

    clone(){
        
        const myobj = Object.entries(this);
        // myobj[]
        console.log();
    }

}
