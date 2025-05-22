import {Task} from "./task.js";
import {Project} from "./project.js";
import {BaseElement, RadioElement, TaskElement} from "./elements.js";

// import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
// import { updateTime, updateTask } from "./index.js";

const onSecondTick = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");

class ProjectManager{
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
        
        // console.log("Active key inside call", this.activeKey)
        if(this.activeKey === null)
            this.activeKey = project.id; 
        this.projects.set(project.id, project);
    }

    getActiveProject(){
        // console.log(this.projects.get(this.activeKey))
        return this.projects.get(this.activeKey);
    }

    switchProject(newKey){
        this.activeKey  = newKey;
        // console.log("switching to")
        // console.log(this.getActiveProject().name)
        // console.log(this.projects.get(this.activeKey))
        // console.log(this.getActiveProject().getActiveTask())
        return this.getActiveProject();
    }

    removeProject(key){
        this.projects.delete(key);
    }
}
class DisplayManager{
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
        console.log("Insidie project")
        console.log(project)
        const iter = project.tasks.values();
        for (const task of iter)
            this.createTaskElement(task)
        // this.addRadioClickEvent(project);    
    }



    
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }

    // addRadioEventListener(){
    //     this.taskElements
    // }

}
class AppController{

    
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();

        //dom elements

        
        this.timeElement = document.querySelector(".timing");
        this.taskNameElement = document.querySelector(".name");
        this.startBtn = document.querySelector(".start");
        this.stopBtn = document.querySelector(".stop");
        this.resetBtn = document.querySelector(".reset");
        this.logBtn = document.querySelector(".logtask");
        this.switchBtn = document.querySelector(".switch");
        
        this.addDomEventListeners();


    }
    addDomEventListeners(){

        // let activeTask = ;
        // console.log("dom task active:")
        // console.log(this.getActiveTask())
        this.timeElement.addEventListener("timechange", (e) => 
            {
            this.updateTime();
            if (this.getActiveTask().timer.duration == 0)
                {
                this.getActiveTask().increment(1);
                this.updateTask();
                }
            }
        )
        this.timeElement.addEventListener("onrefresh",  () => this.getActiveTask().isFinished? "00:00" : this.updateTime())


        this.startBtn.addEventListener("click", () =>  this.getActiveTask().timer.start());
        this.stopBtn.addEventListener("click", () => this.getActiveTask().timer.pause());
        this.resetBtn.addEventListener("click", () => this.getActiveTask().timer.refresh());
        this.logBtn.addEventListener("click",() => this.getActiveTask().print())
        this.switchBtn.addEventListener("click",() =>  {

        // console.log(this.getActiveProject().id);
        // const idx = this.getActiveProject().id;
        // console.log(idx)
        let key = 1;
        this.switch(key);
        // console.log(this.getActiveProject().id)
        // this.projectManager.switchProject(idx == 1? 0 : 1)

        })
    }
    
    addRadioClickEvents(){
        const iter = this.displayManager.taskElements.values();
        for(const item of iter)
        {
            item.elements.taskActive.addEventListener("change",(e) => {
                const task = e.target.parentNode;
                const id = task.dataset.key;
                        
                this.getActiveProject().switchTask(id);
                // console.log("Our New active task is:")
                console.log(this.getActiveProject().getActiveTask());
                this.updateTime(); 
                this.updateTask();   
            })
        }                
    }

    switch(key){
        console.log("Active Project before switcvh:", this.projectManager.getActiveProject());
        this.projectManager.switchProject(key);
        console.log("Active Project after switcvh:", this.projectManager.getActiveProject());
        this.render();
        // console.log("dd")
        // console.log(this.projectManager.getActiveProject());

        // this.displayManager.render();
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
        // console.log("project in app")
        // console.log(this.projectManager.getActiveProject());
        // console.log(this.projectManager.getActiveProject().id);
        return this.projectManager.getActiveProject();
    }
    
    addProject(projectName){
        this.projectManager.addProject(projectName);
        this.displayManager.render(this.projectManager.getActiveProject());
        
    }
    
    removeTask(){}

    render(){
        // console.log(this.projectManager.getActiveProject())
        this.displayManager.render(this.projectManager.getActiveProject());
        this.addRadioClickEvents();
    }
    
    adjustTime(){
        this.timeElement.dispatchEvent(onSecondTick)}

    refreshTime(){
        this.timeElement.dispatchEvent(onRefreshUpdate);}

    updateTime(){
        this.timeElement.textContent = this.getActiveTask().timer.getTime();}

    updateTask(){
        let t = this.getActiveTask();
        this.taskNameElement.textContent = `${t.name}${t.current}/${t.pomodoros}`;}
}


// const obj = new AppController();

const {adjustTime, refreshTime, updateTime, updateTask} = new AppController();

export  {ProjectManager, DisplayManager, AppController, adjustTime, refreshTime}







