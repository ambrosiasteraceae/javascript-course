import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import "./tests.js"

export function adjustTime(){
    timeElement.dispatchEvent(event)
}

export function refreshTime(){
  timeElement.dispatchEvent(onRefreshUpdate);
}

// The million dollar question is how can we register an event to dispatch from inside
//  the Timer class while keeping separaion of concerns. Decorators? delegators?

let activeTask = null;
let activeProject = null;

const timeElement = document.querySelector(".timing");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const logBtn = document.querySelector(".logtask");

const event = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");


function updateTime(){
    timeElement.textContent = activeTask?.timer.getTime();
}


function switchActiveTask(){

    activeTask = activeProject?.getActiveTask();
    updateTime();

    return activeTask? activeTask : console.log("No active tasks currently selected")
}
//@TODO
//The event listener should check for the active task, and get the time of the elapsed current time
// const onTaskChange = new Event("taskchange");
// export function taskChange(){
//     timeElement.dispatchEvent(onTaskChange);
// }
// timeElement.addEventListener("taskchange" , () => timeElement.textContent = task.timer.getTime()) 



/*Question

1. How do we fetch the current task and change time accordingly?;
     - a variable that gets changed when a task is switched?
     - project getActiveTask();
2. How do we switch task and make sure the time is diplayed for the switched task?
3. How do we increment the pomodoros when a task is finished?
4. The event which handles the 
5. Each Task having its own timer seems like a unoptimized  memory wise:
    - when an active task is changed, you should be able to store the timeDuration,
    - and load the timer from that point onwards
*/

timeElement.addEventListener("timechange", (e) => {
    updateTime();

    if (activeTask.timer.duration == 0)
    {

        activeTask.increment(1);
        // setTimeout(() => console.log("hiellos"), 1);
        // ();
    }


})

timeElement.addEventListener("onrefresh",  () => activeTask.isFinished? "00:00":updateTime())


startBtn.addEventListener("click", () =>  activeTask.timer.start());
stopBtn.addEventListener("click", () => activeTask.timer.pause());
resetBtn.addEventListener("click", () => activeTask.timer.refresh());
logBtn.addEventListener("click",() => activeTask.print())

const options = {name: "Pomo App", pomodoros:12};
const timer = new  Timer( FIVE);
const task = new Task(options, timer);

//Init  Display
updateTime();
// 



const project1 = new Project("trial");
activeProject = project1;


project1.generateExamples(10);


project1.tasks[3].isWorkedOn = true;
switchActiveTask()
console.log(activeTask)
project1.tasks[0].timer.duration = 2000;
// project1.listTasks()

activeTask.timer.start();

setTimeout(() => activeTask.timer.pause(), 2000); 

function changeone(){
project1.tasks[3].isWorkedOn = false;
project1.tasks[5].isWorkedOn = true;

}

setTimeout(() => changeone(), 2000); 
// 
setTimeout(() => switchActiveTask(), 3000); 
// console.log(activeTask)
setTimeout(() => activeTask.timer.start(), 4000); 
setTimeout(() => activeTask.timer.pause(), 12000); 

setTimeout(() => console.log(project1.listTasks()), 14000); 
// activeTask.timer.start()


function changetwo(){
    project1.tasks[5].isWorkedOn = false;
project1.tasks[0].isWorkedOn = true;

}

setTimeout(() => changetwo(), 14000); 

setTimeout(() => switchActiveTask(),14000); 
// console.log(activeTask)
setTimeout(() => activeTask.timer.start(), 14000); 
setTimeout(() => activeTask.timer.pause(), 19000); 

setTimeout(() => console.log(project1.listTasks()), 20000); 
// setTimeout(() => activeTask.timer.pause(), 6000); 
