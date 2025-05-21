import {Task} from "./task.js";
import {Project} from "./project.js";
import {BaseElement, RadioElement, TaskElement} from "./elements.js";

// import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import { updateTime, updateTask } from "./index.js";


export  class ProjectManager{
    constructor(){
        this.activeKey = null;
        this.projects = new Map();
    }

    addProject(project){
 /*
 Pretty little bug in the if clause due to 0 indexing of projectid:
 On init:
 - activeKey = null  !null (true)
 - activeKey = 0     !0 (also true)
 - activeKey is still true in the !0 if clause, assigning the 
 */
        
        console.log("Active key inside call", this.activeKey)
        if(this.activeKey === null)
            this.activeKey = project.id; 
        this.projects.set(project.id, project);
    }

    getActiveProject(){
        return this.projects.get(this.activeKey);
    }

    switchProject(newKey){
        this.activeKey  = newKey;
        console.log("switching to")
        console.log(this.getActiveProject().name)
        console.log(this.getActiveProject().getActiveTask())
        return this.getActiveProject();
    }

    removeProject(key){
        this.projects.delete(key);
    }
}
export class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.taskElements = new Map();

        this.displayBtn = document.querySelector(".display");
        this.displayBtn.addEventListener("click",() =>{this.updateAll();})

        
    }

    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
        this.container.append(taskElement);
        // return taskElement;
    }


    updateTask(id){
        const taskElement = this.taskElements.get(id);
        if(taskElement)
            taskElement.update();
    }

    updateAll(){
        this.taskElements.keys().forEach((id) => this.updateTask(id));
    }
    
    render(project){
        this.clear();
        project.tasks.forEach((task) => this.createTaskElement(task));
        this.addRadioClickEvent(project);    
    }

    addRadioClickEvent(project){
        const iter = this.taskElements.values();
        for(const item of iter)
        {
            // console.log(item.elements.taskActive)
            item.elements.taskActive.addEventListener("change",(e) => {
                const task = e.target.parentNode;
                const id = task.dataset.key;                
                // newTask = project.getActiveProject().getTaskbyID(id);
                
                project.switchTask(id);
                console.log("Our New active task is:")
                console.log(project.getActiveTask());
                updateTime(); 
                updateTask();   
                // this.switchActiveTask(id, project)
            })
        }                
    }

    
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }

    addRadioEventListener(){
        this.taskElements
    }

}
export class AppController{

    
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();

        //dom elements

        
        this.startBtn = document.querySelector(".start");
        this.stopBtn = document.querySelector(".stop");
        this.resetBtn = document.querySelector(".reset");
        this.logBtn = document.querySelector(".logtask");
        this.switchBtn = document.querySelector(".switch");
        
        this.addDomEventListeners();


    }
    addDomEventListeners(){

        // let activeTask = ;
        console.log("dom task active:")
        console.log(this.getActiveTask())
        this.startBtn.addEventListener("click", () =>  this.getActiveTask().timer.start());
        this.stopBtn.addEventListener("click", () => this.getActiveTask().timer.pause());
        this.resetBtn.addEventListener("click", () => this.getActiveTask().timer.refresh());
        this.logBtn.addEventListener("click",() => this.getActiveTask().print())
        this.switchBtn.addEventListener("click",() =>  {
        
        const idx = this.projectManager.getActiveProject().id;
        this.projectManager.switchProject(idx == 1? 0 : 1)
        this.displayManager.render(this.projectManager.getActiveProject());
        })
    }
    

    switch(key){

        this.projectManager.switchProject(key);
        this.displayManager.render(this.projectManager.getActiveProject());
    }
    
    addTask(task){
        this.projectManager.getActiveProject().addTask(task)
        this.displayManager.addTask(task);        
    }

    fillTemplates(numTasks){
        this.projectManager.getActiveProject().generateExamples();
    }
    
    getActiveTask(){
        return this.projectManager.getActiveProject()?.getActiveTask();
    }

    getActiveProject(){

    }
    
    addProject(projectName){
        this.projectManager.addProject(projectName);
        this.displayManager.render(this.projectManager.getActiveProject());
    }
    
    removeTask(){}

    render(){
        this.displayManager.render(this.projectManager.getActiveProject());

    }
    
}


