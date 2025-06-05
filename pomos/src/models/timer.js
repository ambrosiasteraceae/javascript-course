import {getUnixTime, format} from "date-fns";
import { AppController} from "../app/index.js";
/*
    Rule of Thumb
    Whenever you pass a class method as a callback, 
    wrap it or bind it, because JavaScript
    doesn't automatically carry this along for the ride.
*/

export class Timer{    

    static ALMOSTONEHOUR = 50 * 60 * 1000;
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds, timeInMilisecondsOriginal = null){
        
        this.duration = timeInMiliseconds;
        
        if(!timeInMilisecondsOriginal)
            this.original = timeInMiliseconds;
        else
            this.original = timeInMilisecondsOriginal;
        //I need to dig about this issue deeper to understand why it works
        this.parseTime = this.parseTime.bind(this);
        this.running = false;

        this.startedAt = null;
        this.finishedAt = null;
        
    }

    toggle(){
        if(this.duration == 0)
            this.refresh()
        this.running ? this.pause() : this.start();
        // console.log(`Time status:${this.running? "on" : "off"}`)
    }

    refresh(){ 
    
        this.duration = this.original;
        AppController.refreshTime();
        // console.log("Refresh was callled:", this.getTime())
    }

    start(){

        this.running = true;
        if (this.duration == 0)
            return
        if(this.duration == this.original)
            this.startedAt = new Date();
        
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
        console.log(this.getTime());
        if (this.duration == 0)
        {
            // console.log(0)
            this.finishedAt = new Date ();
            AppController.adjustTime();
            // this.pause()
            setTimeout(() => this.refresh(), 1000);
        }
        else
            AppController.adjustTime();
        
    }
        
    pause(){
        this.running = false;
        if(this.duration == 0)
            console.log("task  finished at:", this.getTime())
        else
            console.log("Paused at:", this.getTime());
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    getTime(){
        return format(new Date(this.duration), "mm:ss");
    }

}

export const  HALFHOUR = 1800000;
export const  FIFTEEN = 15000;
export const  FIVE = 5000;
