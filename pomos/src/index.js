import "./styles.css";
import "./tests.js";
import Task from "./task.js";
import Project from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import DisplayManager, {BaseElement,  ProjectManager,  TaskElement} from "./display.js";



export function adjustTime(){
    timeElement.dispatchEvent(event)
}

export function refreshTime(){
  timeElement.dispatchEvent(onRefreshUpdate);
}


let activeProject = null;

export const timeElement = document.querySelector(".timing");
export const taskNameElement = document.querySelector(".name");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const logBtn = document.querySelector(".logtask");

const switchBtn = document.querySelector(".switch");
const displayBtn = document.querySelector(".display");

const event = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");

export function updateTime(){
    timeElement.textContent = pm?.getActiveProject().getActiveTask()?.timer.getTime();
}

export function updateTask(){
    activeTask = pm?.getActiveProject().getActiveTask();
    taskNameElement.textContent = `${activeTask.name}${activeTask.current}/${activeTask.pomodoros}`;
}

// function switchActiveTask(newTask){
    
//     //1 Return if there is no task
//     if(!newTask)
//         return
    
//     //2. Deactivate current task
//     if(activeTask)   
//         activeTask.isWorkedOn = false;        

//     //3.Activate current task
//     activeTask = newTask;
//     activeTask.isWorkedOn = true;
    
//     //4.refresh timers
//     console.log ("Our new active task");
//     console.log(activeTask);
//     updateTime(); 
//     updateTask();   

//     return activeTask? activeTask : console.log("No active tasks currently selected");
// }

timeElement.addEventListener("timechange", (e) => {
    updateTime();
    if (activeTask.timer.duration == 0)
        {activeTask.increment(1);
                updateTask();
        }
    // updateTask();   
})

timeElement.addEventListener("onrefresh",  () => activeTask.isFinished? "00:00":updateTime())
startBtn.addEventListener("click", () =>  activeTask.timer.start());
stopBtn.addEventListener("click", () => activeTask.timer.pause());
resetBtn.addEventListener("click", () => activeTask.timer.refresh());
logBtn.addEventListener("click",() => activeTask?.print())
switchBtn.addEventListener("click",() =>  {

    const idx = pm.getActiveProject().id;
    pm.switchProject(idx == 1? 0 : 1)
    dm.display(pm.getActiveProject());
}) 
displayBtn.addEventListener("click",() =>{
    dm.updateAll();
} )


const foo = new Project("foo");
const bar = new Project("bar");


foo.generateExamples(10);
bar.generateExamples(5);

console.log(foo);

// ****** VERSION 2 ********

const dm = new DisplayManager();
const pm = new ProjectManager();

pm.addProject(foo);
// console.log("Current active project id:");
// console.log(pm.activeKey);
pm.addProject(bar);
// console.log("Current active project id:");
// console.log(pm.activeKey);
// console.log("Current project");
// console.log(pm.getActiveProject()); 




// console.log("New project after switch");
// console.log(pm.getActiveProject()); 

// dm.display(pm.getActiveProject());


// pm.switchProject(1);
const options = {name: "Pomo App", pomodoros:12};
const timer = new Timer(FIVE);
const task  = new Task(options, timer);

let activeTask = pm?.getActiveProject().getActiveTask();

dm.display(pm.getActiveProject())

