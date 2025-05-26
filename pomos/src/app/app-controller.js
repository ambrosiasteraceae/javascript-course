
import {Task, Timer} from "../models/index.js";
import {DisplayManager} from "./display-manager.js";
import {ProjectManager} from "./project-manager.js";

const onSecondTick = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");


export class AppController{


    static timeElement= document.querySelector(".timing");
    static adjustTime(){AppController.timeElement.dispatchEvent(onSecondTick);}
    static refreshTime(){AppController.timeElement.dispatchEvent(onRefreshUpdate);}
    
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();
        
        this.timeElement = document.querySelector(".timing");
        this.taskNameElement = document.querySelector(".name");
        this.taskNumberElement = document.querySelector(".number");
        this.startBtn = document.querySelector(".start");
        this.resetBtn = document.querySelector(".reset");
        this.logBtn = document.querySelector(".logtask");
        this.switchBtn = document.querySelector(".switch"); 
        this.addBtn = document.querySelector(".add");
        this.removeBtn = document.querySelector(".remove");
        this.title = document.querySelector("title");

        this.start = false;

    }
    attachEventListeners(){
        this.timeElement.addEventListener("timechange", (e) => 
        {    
            const activeTask = this.getActiveTask();
            this.updateTime();
            if (activeTask.timer.duration == 0)
            {
                activeTask.increment(1);
                this.updateTask();
                this.updateNumber();
                this.toggleState(activeTask);
            }
        });
        // this.timeElement.addEventListener("onrefresh",  () => this.getActiveTask().isFinished? "00:00" : this.updateTime())
        this.timeElement.addEventListener("onrefresh",  () => this.updateTime())

        this.startBtn.addEventListener("click", () => {

            const activeTask = this.getActiveTask();
            if(activeTask.isFinished) {
                console.warn("Cannot start a finished task. Increase the number of pomodoros");
                return;
            }
            if (!activeTask) return;
            this.toggleState(activeTask);
        });



        this.resetBtn.addEventListener("click", () => {

            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.timer.refresh();
        });

        this.logBtn.addEventListener("click", () => {

            const activeTask = this.getActiveTask();
            if (!activeTask) return;
            activeTask.print();
        });
        
        this.switchBtn.addEventListener("click", (event) =>  {

            const project = this.getActiveProject();
            this.switch(project.id == 1? 0 : 1);
            });
        
        this.addBtn.addEventListener("click", (event) => {
            
            const options = {name: "Pomo App", pomodoros:2};
            const timer = new Timer(5000);
            const task  = new Task(options, timer);
            console.log("New task with click eventListener is being created")
            this.addTask(task);
        })

        this.removeBtn.addEventListener("click", (event) => {
            //Possible time for error if we will want to remove tasks while other task is running?
            const activeTask = this.getActiveTask();
            if(activeTask == undefined) return;
            // console.log("Hey");
            // console.log(activeTask)
            if(activeTask.timer.running) this.toggleState(activeTask);
            const index = this.getActiveTask().key;
            console.log(`Removing task with id: ${index}`);
            this.deleteTask(index);
        });
    }

    getTaskElement(key){
        return this.displayManager.taskElements.get(key);
    }

    addRadioClickEvent(taskElement){
        
        taskElement.addEventListener("change", (e) => {
    
            const task = e.target.parentNode;
            const id = task.dataset.key;
            const activeTask = this.getActiveTask();
            if (activeTask)
            {
                if (activeTask.timer.running)
                    this.toggleState(activeTask);
            }     
            this.getActiveProject().switchTask(id);
            // console.log("right before")            
            console.log(this.getActiveProject().getActiveTask());
            // console.log("after")
            this.updateTime(); 
            this.updateTask();   
            this.updateNumber();
        });
    }
    
    addRadioClickEvents(){
    
        const iter = this.displayManager.taskElements.values();
        for(const taskElement of iter)
            this.addRadioClickEvent(taskElement);       
    }

    switch(key){
        console.log(this)
        const activeTask = this.getActiveTask();
        if (activeTask)
        {
            if (activeTask.timer.running)
                this.toggleState(activeTask);
        }
        this.displayManager.getOrder(this.projectManager.getActiveProject());     
        this.projectManager.switchProject(key);
        const switchedTask = this.getActiveTask();
        if(switchedTask)
        {
            this.updateTask();
            this.updateTime();
        }
        else
        {
            this.timeElement.textContent = "00:00";
            this.taskNameElement.textContent = "No Task Selected";
        }
        // console.log(this.getActiveProject().ordering)
        console.log("New Project:", this.getActiveProject());
        this.render();
    }
    
    addTask(task){
        this.projectManager.getActiveProject().addTask(task)
        this.displayManager.createTaskElement(task);
        const taskElement = this.getTaskElement(task.key);
        // console.log(taskElement)
        this.displayManager.renderTask(taskElement);
        this.displayManager.attachDragEvents(taskElement);
        this.addRadioClickEvent(taskElement);        
    }

    fillTemplates(numTasks){
        this.projectManager.getActiveProject().generateExamples();
    }
    
    getActiveTask(){
        const task = this.projectManager.getActiveProject()?.getActiveTask();
        if (task == undefined){
            console.warn("No active task");
            return;
        }  
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
        // this.displayManager.removeDragOverListener();
        this.displayManager.render(this.projectManager.getActiveProject());
        this.addRadioClickEvents();
    }

    toggleState(activeTask){

        activeTask.timer.toggle();
        this.startBtn.textContent = activeTask.timer.running? "Pause." : "Start.";
    }

    updateTime(){
        const activeTask = this.getActiveTask();

        let time = activeTask.timer.getTime();
        this.timeElement.textContent = time;
        this.title.textContent = time;
        // console.log("I was called")
        if (activeTask)            
            this.displayManager.updateTask(activeTask.key);
    }

    
    updateNumber(){       
        //Task is always current and starts from 0. We show user the task number he is working towards
        this.taskNumberElement.textContent = `#${this.getActiveTask().current + 1}`;
    }

    updateTask(){
        let t = this.getActiveTask();
        this.taskNameElement.textContent = `${t.name}${t.current}/${t.pomodoros}`;}
}