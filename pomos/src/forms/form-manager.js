import {Task, Timer } from "../models";
import {sendDataEvent} from "../events"
import { show, hide, bindFormEvents } from "../events";  

export class FormManager{
    constructor(app){
        
        this.app = app;
        this.editMode = false;
        this.taskEditKey = null;
        this.currentTaskElement = null;
        
        this.isOpen = false;  
        
        this.initForm();
        sendDataEvent(this, app);
        bindFormEvents(this, app);
        
    }

    initForm(){

        this.form = document.querySelector("form");
        this.formDiv = document.querySelector(".form");
        this.cancelTaskBtn =document.querySelector(".cancel");
        this.initTaskFormBtn = document.querySelector(".add-task")
        
        // this.formDiv = document.querySelector(".form");
        this.taskDiv = document.querySelector(".before-form");
        this.notes = document.querySelector(".notes");

        this.submitTaskBtn = document.querySelector(".submit");      
        this.addNotesBtn = document.querySelector(".expansion");
        this.displayBtn = document.querySelector(".display");
    }

    editFromForm(data){

        const editTask =  this.app.getActiveProject().getTask(this.taskEditKey)
        editTask.name = data.name;
        editTask.pomodoros = data.pomodoros;
        editTask.notes = data.notes;
        console.log("submit was prevented due to edit mode")
        this.editMode = false;
        this.currentTaskElement.isEdited = false;
        this.app.editTask(editTask);

        if(editTask.isActive)
            this.app.updateTask();
        
        //Move back the div so we do not have non-task elements in the container.
        //This was the  major cause for the ordering bug.
        this.taskDiv.after(this.formDiv); 
        hide(this.formDiv);
        // this.isOpen = false;
        show(this.currentTaskElement.el);
        show(this.taskDiv);
        this.submitTaskBtn.textContent = "Add Task";
    }

    createFromForm(data){
        const timers  = new Timer(15000);
        const task = new Task(data, timers);
        this.app.addTask(task);
        // this.isOpen = false;
        hide(this.formDiv);
        show(this.taskDiv);
        // show(this.currentTaskElement.el);        
    
    }

    sendData() 
    {    
        const formData = new FormData(this.form);    
        const data = Object.fromEntries(formData.entries());
        if(this.editMode == true)
        {   
            this.editFromForm(data, this.app);
            return
        }
        this.createFromForm(data, this.app);
    }

    editTaskCallback(e) {
        console.log("I was called");
        const child = e.target.parentNode;
        const parent = child.parentNode;
        
        parent.insertBefore(this.formDiv, child);
        
        show(this.formDiv);
        // hide(this.taskDiv);
        this.editMode = true;
        // this.isOpen = true;

        const key = Number(child.dataset.key);
        const proj = this.app.getActiveProject();
        const task = proj.getTask(key);

        document.getElementById("task-name").value = task.name;
        document.getElementById("pomodoro").value = task.pomodoros;
        document.getElementById("notes").value = task.notes;
        document.getElementById("task-name").focus();
        this.taskEditKey = task.key;
        this.currentTaskElement = this.app.getTaskElement(this.taskEditKey);
        this.currentTaskElement.isEdited = true;
        
        hide(this.currentTaskElement.el);
        if (this.editMode)
            this.submitTaskBtn.textContent = "Save";

    }

    handleTaskEditAll(){
        this.settingsBtns = document.querySelectorAll(".settings");
        this.settingsBtns.forEach((elem)=> this.handleTaskEdit(elem,this.app));        
    }
    //It is currently assigned in render. but we can assign it in the display manager?
    handleTaskEdit(elem){
        elem.addEventListener("click", (e) => this.editTaskCallback(e));
    }

    clearInner(el){}
}

