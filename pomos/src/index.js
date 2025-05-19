
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import "./tests.js";
import DisplayManager, {BaseElement,  ProjectManager,  TaskElement} from "./display.js";



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


const foo = new Project("foo");
const bar = new Project("bar");


foo.generateExamples(7);
bar.generateExamples(4);



// ****** VERSION 2 ********


const dm = new DisplayManager();
const pm = new ProjectManager();

pm.addProject(foo);
console.log("Current active project id:");
console.log(pm.activeKey);
pm.addProject(bar);
console.log("Current active project id:");
console.log(pm.activeKey);
console.log("Current project");
console.log(pm.getActiveProject()); 




// console.log("New project after switch");
// console.log(pm.getActiveProject()); 

// dm.display(pm.getActiveProject());


pm.switchProject(1);
const options = {name: "Pomo App", pomodoros:12};
const timer = new  Timer( FIVE);
const task = new Task(options, timer);


dm.display(pm.getActiveProject())

setTimeout(() =>{
    pm.getActiveProject().addTask(task);
    dm.createTaskElement(task);
    // pm.switchProject(1);
    dm.display(pm.getActiveProject())
}, 2000);

// dm.display(pm.getActiveProject());


// const activeTaskElement = document.querySelector("input[name=task]:checked");
const activeTaskElement = document.querySelectorAll(".radio");

activeTaskElement.forEach((radioElem) => {radioElem.addEventListener("change", (e)=>{
    const taskDiv = e.target.parentNode;
    const taskID = taskDiv.dataset.key;
    const newTask = pm.getActiveProject().getTaskbyID(taskID)
    switchActiveTask(newTask);

})});