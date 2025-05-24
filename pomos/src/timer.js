import {getUnixTime, format} from "date-fns";
import { AppController} from "./display";




/*
    Rule of Thumb
    Whenever you pass a class method as a callback, 
    wrap it or bind it, because JavaScript
    doesn't automatically carry this along for the ride.
*/

export default class Timer{
    
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds){
        
        this.original = timeInMiliseconds;
        this.duration = timeInMiliseconds;
        //I need to dig about this issue deeper to understand why it works
        this.parseTime = this.parseTime.bind(this);
        
    }

    refresh(){ 
    
        this.duration = this.original;
        AppController.refreshTime();
        console.log("Refresh was callled:", this.getTime())
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
        AppController.adjustTime();
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

export const  HALFHOUR = 1800000;
export const  FIFTEEN = 15000;
export const  FIVE = 5000;
