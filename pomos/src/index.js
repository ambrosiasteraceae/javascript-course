import "./styles.css";
import "./tests.js";
import {Task} from "./task.js";
import {Project} from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import  {AppController, DisplayManager,  ProjectManager} from "./display.js";



//Move the 


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
title.textContent = "pula";

app.render();


