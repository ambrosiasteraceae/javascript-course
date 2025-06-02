import {getUnixTime, format} from "date-fns";
// import { AppController} from "../app/index.js";




/*
    Rule of Thumb
    Whenever you pass a class method as a callback, 
    wrap it or bind it, because JavaScript
    doesn't automatically carry this along for the ride.
*/

export class Timer{
    
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds){
        
        this.original = timeInMiliseconds;
        this.duration = timeInMiliseconds;
        //I need to dig about this issue deeper to understand why it works
        this.parseTime = this.parseTime.bind(this);
        this.running = false;

        this.startedAt = null;
        this.finishedAt = null;
        
    }

    toggle(){
        this.running ? this.pause() : this.start();
        console.log(`Time status:${this.running? "on" : "off"}`)
    }

    refresh(){ 
    
        this.duration = this.original;
        // AppController.refreshTime();
        console.log("Refresh was callled:", this.getTime())
    }

    start(){
        this.running = true;
        if (this.duration == 0)
            return
        if(this.duration == this.original)
            this.startedAt = new Date();
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
        // AppController.adjustTime();
        console.log(this.getTime());
        if (this.duration == 0)
        {
            this.pause()
            this.finishedAt = new Date ();
            setTimeout(() => this.refresh(), 1000);
        }
    }
        
    pause(){

        this.running = false;
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
