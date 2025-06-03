

import {DisplayManager} from "./display-manager.js";
import {ProjectManager} from "./project-manager.js";
import {FormManager} from "../forms/form-manager.js";
import {
    addRadioClickEvent,
    addRadioClickEvents,
    attachEventListeners, 
     } from "../events";

const onSecondTick = new Event("timechange");
const onRefreshUpdate = new Event("onrefresh");


export class AppController{


    static timeElement = document.querySelector(".timing");
    static adjustTime(){AppController.timeElement.dispatchEvent(onSecondTick);}
    static refreshTime(){AppController.timeElement.dispatchEvent(onRefreshUpdate);}
    
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();
        this.formManager = new FormManager(this);

        this.init();
        attachEventListeners(this);
    }

    init(){

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
    }

    editTask(editTask){
        //cure
        console.log("Hey@as I ever called?")
        
        this.projectManager.getActiveProject().tasks[editTask.key] = editTask;
        const taskElement = this.displayManager.getTaskElement(editTask.key);
        taskElement.task = editTask;
        taskElement.update();

 
    }   

    getTaskElement(key){
        return this.displayManager.taskElements.get(key);
    }

    switch(key){

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
        
        this.render();
        
    }
    
    addTask(task){
        this.projectManager.getActiveProject().addTask(task)
        this.displayManager.createTaskElement(task);
        const taskElement = this.getTaskElement(task.key);
        
        this.displayManager.renderTask(taskElement);        
        console.log(taskElement);
        this.formManager.handleTaskEdit(taskElement.elements.taskSettings);
        addRadioClickEvent(this, taskElement);        
    }

    fillTemplates(numTasks){
        this.projectManager.getActiveProject().generateExamples();
    }
    
    getActiveTask(){
        const task = this.projectManager.getActiveProject()?.getActiveTask();
        // console.log(task);
        if (task == undefined) {
            // console.warn("No active task");
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

        this.displayManager.render(this.projectManager.getActiveProject());
        addRadioClickEvents(this);
        this.formManager.handleTaskEditAll(); 
    }

    toggleState(activeTask){

        activeTask.timer.toggle();
        this.startBtn.textContent = activeTask.timer.running? "Pause." : "Start.";
    }

    updateTime(){
        
        const activeTask = this.getActiveTask();
        // console.log(activeTask);
        let time = activeTask.timer.getTime();
        this.timeElement.textContent = time;
        this.title.textContent = time;
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