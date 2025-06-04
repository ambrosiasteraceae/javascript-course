import "./styles.css";

import {Task, Project, Timer} from "./models/index.js";
import {AppController, load} from "./app/index.js";

console.log(Object.keys(localStorage).length == 0)
    
console.log("Storage is :", Object.keys(localStorage).length == 0 ? "empty" : "populated")

function hasLocalStorage () {
    return Object.keys(localStorage).length == 0
}

function populate(app){
    
    const work = new Project("Project X");
    const top = new Project("Web Development Journey");
    // work.generateExamples(3);
    top.generateExamples(3);
    app.projectManager.addProject(top);
    // app.projectManager.addProject(work);
    // return app
}
// localStorage.clear();
const app = new AppController();
if(Object.keys(localStorage).length != 0)
    load(app);
else
    populate(app);

app.render();

// if(Object.keys(localStorage).length == 0 ? )

// localStorage.clear();
// const sm = new StorageManager();
// const data = sm.save(app);
// sm.load(app);

