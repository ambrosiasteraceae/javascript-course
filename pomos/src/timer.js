import {getUnixTime, format} from "date-fns";
import  {adjustTime, refreshTime} from "./index.js";

export const  HALFHOUR = 1800000;
export const  FIFTEEN = 15000;
export const  FIVE = 5000;

// const fns = require("date-fns");

/*
    Rule of Thumb
    Whenever you pass a class method as a callback, 
    wrap it or bind it, because JavaScript
    doesn't automatically carry this along for the ride.
*/

export default class Timer{
    
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds){
        // this.isPaused = false;
        this.original = timeInMiliseconds;
        this.duration = timeInMiliseconds;
        
        // this.task = task;
        // this.intervalId;
        //I need to dig about this issue deeper to understand why it works
        this.parseTime = this.parseTime.bind(this);
    }

    refresh(){ 
        //How do we handle the this.duration since we do not want to reset it if it is finished
        this.duration = this.original;
        refreshTime();
        console.log("Refresh was callled:", this.getTime())
        // this.pause()
        // adjustTime();
    }

    start(){
        if (this.duration == 0)
            return
        console.log("Started at:", this.getTime())
        if(!this.intervalId)
        {
            this.intervalId = setInterval(this.parseTime, 1000);
            return
        }      

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
        {
            this.pause()
            setTimeout(() => this.refresh(), 1000);
        }
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


