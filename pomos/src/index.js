import "./styles.css";
// import {Task} from "./models/task.js";
// import {Project} from "./models/project.js";
// import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
// import  {AppController, DisplayManager,  ProjectManager} from "./app/display.js";

import {Task, Project, Timer} from "./models/index.js";
import {AppController} from "./app/index.js";

const foo = new Project("foo");
const bar = new Project("bar");
foo.generateExamples(3);
bar.generateExamples(3);

const app = new AppController();
app.attachEventListeners();


app.projectManager.addProject(foo);
app.projectManager.addProject(bar);


const title = document.querySelector("title");
console.log(title)
console.log(title.textContent)
title.textContent = "nothying";

app.render();
// app.displayManager.handleOpenSettings();


