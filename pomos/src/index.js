
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Timer from "./session.js";

const t1 = new Timer(12000);

let i = 0;

function doSomething(){
    t1.decrement();
    console.log(t1.getTime());
    console.log(t1.duration)
    if (t1.duration == 0)
        stopTimer()
}

let intervalId;


function decrementTimer()
{
    if(!intervalId)
        intervalId = setInterval(doSomething, 1000)
}



function stopTimer()
{
    clearInterval(intervalId);
    intervalId = null;
}

decrementTimer();



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