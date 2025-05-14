import {getUnixTime, format} from "date-fns";

// const fns = require("date-fns");


export default class Session{
    //A timer is assigned to each task, but this does not mean the timer starts when it is instantiated
    constructor(timeInMiliseconds){
        this.isPaused = false;
        this.duration = timeInMiliseconds;
    }

    start(){
        this.start = new Date();
    }

    decrement(){
        
        if((this.duration - 1000) >= 0)
            this.duration -= 1000
        else
            console.log("Task Completed")    
        }
        

    pause(){
    
    }

    end(){

    }
    getTime(){
        return format(new Date(this.duration), "mm:ss");

    }


    getElapsed(){
        console.log(getUnixTime(this.start))
    }

}

// class Session{
//     constructor(){
//         start();
//         pause();
//         end();
//     }
// }

