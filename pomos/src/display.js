import {BaseElement, TaskElement} from "./elements.js";
import {Task} from "./task.js";
import {Project} from "./project.js";
import Timer, {HALFHOUR, FIFTEEN} from "./timer.js"



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
        if(this.activeKey === null)
            this.activeKey = project.id; 
        this.projects.set(project.id, project);
    }

    getActiveProject(){
        const activeProject = this.projects.get(this.activeKey);
        if (!activeProject) {
            console.warn("No active project");
            return;
        }
        return activeProject;
    }

    switchProject(newKey){
        this.activeKey  = newKey;
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
        const iter = project.tasks.values();
        for (const task of iter)
            this.createTaskElement(task)    
    }

    
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }


}
class AppController{


    static timeElement= document.querySelector(".timing");
    static adjustTime(){AppController.timeElement.dispatchEvent(onSecondTick);}
    static refreshTime(){AppController.timeElement.dispatchEvent(onRefreshUpdate);}
    
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();
        
        this.timeElement = document.querySelector(".timing");
        this.taskNameElement = document.querySelector(".name");
        this.startBtn = document.querySelector(".start");
        this.stopBtn = document.querySelector(".stop");
        this.resetBtn = document.querySelector(".reset");
        this.logBtn = document.querySelector(".logtask");
        this.switchBtn = document.querySelector(".switch");        

    }
    attachEventListeners(){
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
        this.switchBtn.addEventListener("click",(event) =>  {
        
        const project = this.getActiveProject();
        this.switch(project.id == 1? 0 : 1);

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
                console.log(this.getActiveProject().getActiveTask());
                this.updateTime(); 
                this.updateTask();   
            })
        }                
    }

    switch(key){
        
        this.projectManager.switchProject(key);
        console.log("New Project:", this.getActiveProject());
        this.render();
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
        return this.projectManager.getActiveProject();
    }
    
    addProject(projectName){
        this.projectManager.addProject(projectName);
        this.displayManager.render(this.projectManager.getActiveProject());
    }
    
    removeTask(){}

    render(){
        this.displayManager.render(this.projectManager.getActiveProject());
        this.addRadioClickEvents();
    }
    
    // adjustTime(){
    //     //The method that is being exported to a module doesnt know the app context 
    //     //and maybe the this.timeElement doesnt exist in that function call

    //     // - this should be  a static field?
    //     // - or a static method?
    //     this.timeElement.dispatchEvent(onSecondTick)
    // }
    // refreshTime(){
    //     this.timeElement.dispatchEvent(onRefreshUpdate);}

    updateTime(){
        this.timeElement.textContent = this.getActiveTask().timer.getTime();}

    updateTask(){
        let t = this.getActiveTask();
        this.taskNameElement.textContent = `${t.name}${t.current}/${t.pomodoros}`;}
}

export  {ProjectManager, DisplayManager, AppController}







