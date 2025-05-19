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
6. The million dollar question is how can we register an event to dispatch from inside 
    - the Timer class while keeping separaion of concerns. Decorators? delegators?
*/

/* 
Issues
- a task that is finished can be started with countdown;
- multiple timers can be be played simultaneously
- task list needs to be updated when a task is completed or when a task is advancing, on the dom side
*/


import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import "./tests.js";
import DisplayManager, {BaseElement,  TaskElement} from "./display.js";



export function adjustTime(){
    timeElement.dispatchEvent(event)
}

export function refreshTime(){
  timeElement.dispatchEvent(onRefreshUpdate);
}



let activeTask = null;
let activeProject = null;

const timeElement = document.querySelector(".timing");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const logBtn = document.querySelector(".logtask");
const taskNameElement = document.querySelector(".name");

const event = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");

function updateTime(){
    timeElement.textContent = activeTask?.timer.getTime();
}

function updateTask(){
    taskNameElement.textContent = `${activeTask.name}${activeTask.current}/${activeTask.pomodoros}`;
}
function switchActiveTask(newTask){
    
    if(!newTask)
        return
    
    if(activeTask)   
        activeTask.isWorkedOn = false;        

    activeTask = newTask;
    activeTask.isWorkedOn = true;
    
    console.log ("Our new active task");
    console.log(activeTask);
    updateTime(); 
    updateTask();   

    return activeTask? activeTask : console.log("No active tasks currently selected");
}



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

// const options = {name: "Pomo App", pomodoros:12};
// const timer = new  Timer( FIVE);
// const task = new Task(options, timer);

// //Init  Display
// // updateTime();

const project1 = new Project("trial");
activeProject = project1;

project1.generateExamples(10);


// project1.tasks[3].isWorkedOn = true;
// switchActiveTask()
// console.log(activeTask)
// project1.tasks[4].isWorkedOn = true;
// switchActiveTask()
// console.log(activeTask)

// ****** VERSION 1 ********

// const manager = new DisplayManager();
// manager.addProject(project1);
// manager.populateProject();


// ****** VERSION 2 ********
const manager = new DisplayManager();

manager.display(project1);



// const projElement = new BaseElement(".projects");

// console.log("Project is: ");
// console.log(projElement);

// console.log(document.querySelector(".projects"));
// activeTask = project1.tasks[3];
// console.log("activbe[ask before task element", activeTask)
// const ate = new TaskElement(activeTask);
// console.log("Ate is");
// console.log(ate);

// const activeTaskElement = document.querySelector("input[name=task]:checked");
const activeTaskElement = document.querySelectorAll(".radio");

activeTaskElement.forEach((radioElem) => {radioElem.addEventListener("change", (e)=>{
    const taskDiv = e.target.parentNode;
    const taskID = taskDiv.dataset.key;
    const newTask = project1.getTaskbyID(taskID)
    switchActiveTask(newTask);

})});