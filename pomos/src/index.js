import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Session from "./session.js";


export function adjustTime(){
    timeElement.dispatchEvent(event)
}

// The million dollar question is how can we register an event to dispatch from inside
//  the session class while keeping separaion of concerns. Decorators? delegators?
const ts = new Session(12000);

const timeElement = document.querySelector(".timing");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

timeElement.textContent = ts.getTime();


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

// let i = 0;

// function doSomething(){
//     t1.decrement();
//     console.log(t1.getTime());
//     console.log(t1.duration)
//     if (t1.duration == 0)
//         stopTimer()
// }

// let intervalId;


// function decrementTimer()
// {
//     if(!intervalId)
//         intervalId = setInterval(doSomething, 1000)
// }


// function stopTimer()
// {
//     clearInterval(intervalId);
//     intervalId = null;
// }

// decrementTimer();



// const tsk1 = new Task("Webpack", 19, "something");
// tsk1.addPomodoros(10);
// tsk1.increment();
// tsk1.increment();
// tsk1.increment();
// tsk1.increment();

// console.log(tsk1.print());
// console.log(tsk1.current);

// const tsk2 = new Task("TodoTask", 12, "test");
// console.log(tsk1.key,tsk2.key)
// console.log(Task.printKey())

// const test = new Project("Test");
// console.log(test.name)
// console.log("With tasks", test.listTasks());

// const pomo  = new Project("pomo");
// console.log(pomo.name);
// pomo.addTask(tsk1);
// pomo.addTask(tsk2);
// console.log(pomo);

// const trial = new Project("trial");
// trial.generateExamples(10);
// console.log(trial)
// console.log("hello world");
// console.log("hio from me twoo");


// let current, previous;

// function trackChanges(){
//     console.log("Was I fired>?")
//     current = ts.duration;
//     if(current == previous)
//         return
//     timeElement.textContent = ts.getTime();
//     previous = current;
// }
// timeElement.textContent = ts.getTime();
// timeElement.addEventListener("custom-event",trackChanges);
