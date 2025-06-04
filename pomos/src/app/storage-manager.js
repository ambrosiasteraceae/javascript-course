import { Task, Timer, Project } from "../models";
import { AppController } from "./app-controller";

export function load(app){
    console.log("load project was called")
    console.log(Object.values(localStorage))
    for (let loadedProj of Object.values(localStorage))
    {
        let parsed = JSON.parse(loadedProj);
        console.log(parsed)
        // // console.log("loadedProj is")
        // console.log("this is what is parsed:")
        // console.log(parsed)
        let lproj = new Project(`${parsed.name}+load`);
        lproj._id = Number(parsed._id);

        // console.log("the retrun ordering is:")
        // console.log(parsed.ordering);
        const tts = parsed.tasks;
        for (let t of [...Object.values(tts)]) 
            lproj.addTask(StorageManager.populateItem(t));
        lproj.ordering = parsed.ordering;
        
        // console.log(lproj)
        app.projectManager.addProject(lproj);
        // console.log(app);
    }
    // return app 
}

export class StorageManager{
static  populateItem(jsonTask){
        
        // const jsonTask = JSON.parse(jsonString);
        
        const ti = new Timer(jsonTask.timer.duration, jsonTask.timer.original)
        
        ti.running = jsonTask.timer.running;
        ti.startedAt = jsonTask.timer.startedAt;
        ti.finishedAt = jsonTask.timer.finishedAt;
        const ta = Task.clone(jsonTask, ti);
        return ta;
    }

    constructor(app){
        
        // this.app = app;
        this.saveBtn = document.querySelector(".save");
        this.saveBtn.addEventListener("click", ()=>{this.save(app)});
    }



    /*
    we save only once. we are then just keeping track of updates
    we update when a task is created or when a task is being updated.
    we should also add a new key when a new project is added.
    */

    removeItem(project){
        localStorage.removeItem(project._id);
        this.storeProject(project)
    }

    storeProject(project){
        console.log("storeproject was called")
        const proj = {};
        const tasks =  {};
        for(let [tKey, tValue] of project.tasks)
            tasks[tKey] = tValue;    
        proj["name"] = project.name; 
        proj["_id"] = project._id;
        proj["ordering"] = project.ordering;
        proj["tasks"] = tasks;
        
        localStorage.setItem(project._id, JSON.stringify(proj));   
    }

    save(app){

        const projects = [...app.projectManager.projects.values()];
        const data = {};
        for (let project of projects)
            this.storeProject(project);
        console.log(localStorage);
    }
 




}