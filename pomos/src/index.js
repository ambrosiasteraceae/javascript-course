import "./styles.css";
import "./tests.js";
import {Task} from "./task.js";
import {Project} from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import  {AppController, DisplayManager,  ProjectManager} from "./display.js";



//Move the 


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


