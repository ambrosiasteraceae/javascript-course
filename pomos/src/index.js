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




const timeElement = document.querySelector(".timing");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const logBtn = document.querySelector(".logtask");

const event = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");


function updateTime(){
    timeElement.textContent = task.timer.getTime();
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

    if (task.timer.duration == 0)
    {

        task.increment(1);
        // setTimeout(() => console.log("hiellos"), 1);
        // ();
    }


})

timeElement.addEventListener("onrefresh",  () => updateTime())


startBtn.addEventListener("click", () =>  task.timer.start());
stopBtn.addEventListener("click", () => task.timer.pause());
resetBtn.addEventListener("click", () => task.timer.refresh());
logBtn.addEventListener("click",() => task.print())

const options = {name: "Pomo App", pomodoros:12};
const timer = new  Timer( FIVE);
const task = new Task(options, timer);

//Init  Display
updateTime();




// const trial = new Project("trial");
// trial.generateExamples(10);
// console.log(trial.tasks)

// console.log(trial.listTasks())
// console.log(trial.listTasks())
// trial.removeTask(-1)
// console.log(trial.listTasks())
// trial.addTask(new Task("task=oks2", 5))
// trial.removeTask(0);
// console.log(trial.listTasks())
// console.log(trial.getID())