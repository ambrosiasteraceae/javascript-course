import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Timer from "./timer.js";
import "./tests.js"

export function adjustTime(){
    timeElement.dispatchEvent(event)
}

// The million dollar question is how can we register an event to dispatch from inside
//  the Timer class while keeping separaion of concerns. Decorators? delegators?
const ts = new Timer(12000);

const timeElement = document.querySelector(".timing");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

timeElement.textContent = ts.getTime(); //time init display;

const event = new Event("timechange");

timeElement.addEventListener("timechange", () => timeElement.textContent = ts.getTime())
startBtn.addEventListener("click", () =>  ts.start());
stopBtn.addEventListener("click", () => ts.pause());
resetBtn.addEventListener("click", () => ts.refresh());

// setTimeout(() => timeElement.dispatchEvent(event),1000);
// setTimeout(() => timeElement.dispatchEvent(event),2000);
// setTimeout(() => timeElement.dispatchEvent(event),3000);
// setTimeout(() => timeElement.dispatchEvent(event),4000);

// ts.start();
// setTimeout(() => ts.pause(),2000);
// setTimeout(() => ts.start(),4000);


// ts.start();
// ts.pause();
// ts.start();
// setTimeout(() => ts.pause(),2000);

// // ts.start()
// setTimeout(ts.start,4000);



// ts.decrement();
// ts.decrement();
// ts.decrement();
// console.log(ts.getTime());



