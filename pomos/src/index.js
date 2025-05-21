import "./styles.css";
import "./tests.js";
import {Task} from "./task.js";
import {Project} from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import  {AppController, DisplayManager,  ProjectManager} from "./display.js";

const event = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");

const foo = new Project("foo");
const bar = new Project("bar");
foo.generateExamples(10);
bar.generateExamples(5);

const app = new AppController();


// const dm = new DisplayManager();
// const pm = new ProjectManager();

app.projectManager.addProject(foo);
app.projectManager.addProject(bar);

const options = {name: "Pomo App", pomodoros:12};
const timer = new Timer(FIVE);
const task  = new Task(options, timer);

app.render();


const timeElement = document.querySelector(".timing");
const taskNameElement = document.querySelector(".name");

export function adjustTime(){
    timeElement.dispatchEvent(event)
}

export function refreshTime(){
  timeElement.dispatchEvent(onRefreshUpdate);
}

export function updateTime(){
    timeElement.textContent = app.getActiveTask().timer.getTime();
}

export function updateTask(){
    // let activeTask = app.getActiveTask();
    taskNameElement.textContent = `${app.getActiveTask().name}${app.getActiveTask().current}/${app.getActiveTask().pomodoros}`;
}

timeElement.addEventListener("timechange", (e) => {
    updateTime();
        if (app.getActiveTask().timer.duration == 0)
            {app.getActiveTask().increment(1);
                    updateTask();}})
timeElement.addEventListener("onrefresh",  () => app.getActiveTask().isFinished? "00:00" : updateTime())
