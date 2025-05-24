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

    addTask(task){
        this.getActiveProject().addTask(task);
    }

    removeTask(index){
        this.getActiveProject().removeTask(index);
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

    removeTaskElement(index){
        this.taskElements.get(index).remove();
        this.taskElements.delete(index);
        console.log(this.taskElements)
        
    }


    updateTask(id){
        const taskElement = this.taskElements.get(id);
        if(taskElement)
            taskElement.update();
    }

    updateAll(){
        this.taskElements.keys().forEach((id) => this.updateTask(id));
    }

    renderTask(taskElement){
        this.container.append(taskElement);
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
        this.addBtn = document.querySelector(".add");
        this.removeBtn = document.querySelector(".remove");
        this.title = document.querySelector("title");

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


        this.startBtn.addEventListener("click", () => {
            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.timer.start();});
        this.stopBtn.addEventListener("click", () => {
            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.timer.pause();});
        this.resetBtn.addEventListener("click", () => {
            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.timer.refresh();});
        this.logBtn.addEventListener("click",() => {
            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.print();});
        this.switchBtn.addEventListener("click",(event) =>  {
        const project = this.getActiveProject();
        this.switch(project.id == 1? 0 : 1);
        });
        this.addBtn.addEventListener("click", (event)=> {
            const options = {name: "Pomo App", pomodoros:12};
            const timer = new Timer(5000);
            const task  = new Task(options, timer);
            console.log("New task with click eventListener is being created")
            this.addTask(task);
        })

        this.removeBtn.addEventListener("click",(event) => {
            const activeTask = this.getActiveTask();
            if(activeTask == undefined) return;
            const index = this.getActiveTask().key;
            console.log(`Removing task with id: ${index}`);
            this.deleteTask(index);
        })
    }

    getTaskElement(key){
        return this.displayManager.taskElements.get(key);
    }

    addRadioClickEvent(taskElement){
        //get taskElements
        // const taskElement = this.displayManager.taskElements.get(task.key);
        taskElement.addEventListener("change", (e) =>{
                const task = e.target.parentNode;
                const id = task.dataset.key;
                const activeTask = this.getActiveTask();
                if (activeTask)
                    activeTask.timer.pause()       
                this.getActiveProject().switchTask(id);            
                console.log(this.getActiveProject().getActiveTask());
                this.updateTime(); 
                this.updateTask();   
            })
    }
    
    addRadioClickEvents(){
        const iter = this.displayManager.taskElements.values();
        for(const taskElement of iter)
            this.addRadioClickEvent(taskElement);       
    }

    switch(key){
        const activeTask = this.getActiveTask();
            if (activeTask)
                activeTask.timer.pause()   
        this.projectManager.switchProject(key);
        console.log("New Project:", this.getActiveProject());
        this.render();
    }
    
    addTask(task){
        this.projectManager.getActiveProject().addTask(task)
        this.displayManager.createTaskElement(task);
        const taskElement = this.getTaskElement(task.key);
        console.log(taskElement)
        this.addRadioClickEvent(taskElement);        
    }

    fillTemplates(numTasks){
        this.projectManager.getActiveProject().generateExamples();
    }
    
    getActiveTask(){
        const task = this.projectManager.getActiveProject()?.getActiveTask();
        if (task == undefined){
            console.warn("No activbe task");
            return
        }  

        // return this.projectManager.getActiveProject()?.getActiveTask();
        return task;
    }

    getActiveProject(){
        return this.projectManager.getActiveProject();
    }
    
    addProject(projectName){
        this.projectManager.addProject(projectName);
        this.displayManager.render(this.projectManager.getActiveProject());
    }
    
    deleteTask(index){
        this.displayManager.removeTaskElement(index);
        this.projectManager.removeTask(index);
    }

    render(){
        this.displayManager.render(this.projectManager.getActiveProject());
        this.addRadioClickEvents();
    }
    updateTime(){
        let time = this.getActiveTask().timer.getTime()
        this.timeElement.textContent = time;
        this.title.textContent = time;
        // add update
        console.log("Is this where its called?")
        const activeTask = this.getActiveTask();
        if (activeTask)            
            this.displayManager.updateTask(activeTask.key);

    }

    updateTask(){
        let t = this.getActiveTask();
        this.taskNameElement.textContent = `${t.name}${t.current}/${t.pomodoros}`;}
}

export  {ProjectManager, DisplayManager, AppController}







