import {getUnixTime, format} from "date-fns";
import  {adjustTime} from "./index.js"
// const fns = require("date-fns");
/*
Rule of Thumb
Whenever you pass a class method as a callback, 
wrap it or bind it, because JavaScript
doesn't automatically carry this along for the ride.
*/

export default class Session{
    
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds, task = null){
        // this.isPaused = false;
        this.original = timeInMiliseconds;
        this.duration = timeInMiliseconds;
        this.task = task;
        // this.intervalId;
        //I need to dig about this issue deeper to understand why it works
        this.parseTime = this.parseTime.bind(this);
    }

    refresh(){ 
        console.log("Refresh was callled:", this.getTime())
        this.duration = this.original;
        adjustTime();
    }

    start(){
        
        console.log("Started at:", this.getTime())
        if(!this.intervalId)       
            this.intervalId = setInterval(this.parseTime, 1000);
    }
    
    decrement(){
        const result = this.duration - 1000;
        if(result >= 0)
            this.duration = result;
    }

   
    parseTime(){
        
    this.decrement();
    adjustTime();
    console.log(this.getTime());

    if (this.duration == 0)
        this.pause()
    }
        
    pause(){
        console.log("Paused at:", this.getTime());
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    getTime(){
        return format(new Date(this.duration), "mm:ss");
    }

}


