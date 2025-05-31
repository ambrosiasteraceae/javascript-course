import {Task, Timer } from "../models";
import {sendDataEvent} from "../events"
import { show, hide } from "../events";  
export class FormManager{
    constructor(app){
        
        this.app = app;
        this.editMode = false;
        this.taskEditKey = null;
        this.form = document.querySelector("form");
        this.formDiv = document.querySelector(".form");

        sendDataEvent(this, app)
        console.log("taskidiv is:", this.app.displayManager.taskDiv)
    }

    editFromForm(data){

        const editTask =  this.app.getActiveProject().getTask(this.taskEditKey)
        editTask.name = data.name;
        editTask.pomodoros = data.pomodoros;
        editTask.notes = data.notes;
        console.log("submit was prevented due to edit mode")
        this.editMode = false;
        this.app.editTask(editTask);




        if(editTask.isActive)
            this.app.updateTask();
        //Move back the div so we do not have non-task elements in the container
        this.app.displayManager.taskDiv.after(this.formDiv); 
        hide(this.formDiv);
    }

    createFromForm(data){
        const timers  = new Timer(15000);
        const task = new Task(data, timers)
        this.app.addTask(task);
        this.app.displayManager.hasEnterClick = false;
        hide(this.formDiv);
        show(this.app.displayManager.taskDiv)
        
    }

    sendData() 
    {    
        console.log("EditMode:", this.editMode)
        const formData = new FormData(this.form);    
        const data = Object.fromEntries(formData.entries());
        if(this.editMode == true)
        {   
            this.editFromForm(data, this.app);
            this.app.displayManager.hasEnterClick = false;
            return
        }
        this.createFromForm(data, this.app);


    }

    editTaskCallback(e) {

        const child = e.target.parentNode;
        const parent = child.parentNode;
        
        parent.insertBefore(this.formDiv, child);
        // this.formDiv.classList.remove("hidden");
        show(this.formDiv);
        this.editMode = true;

        const key = Number(child.dataset.key);
        const proj = this.app.getActiveProject();
        const task = proj.getTask(key);

        document.getElementById("task-name").value = task.name;
        document.getElementById("pomodoro").value = task.pomodoros;
        document.getElementById("notes").value = task.notes;
        this.taskEditKey = task.key;
    }

    handleTaskEditAll(){
        this.settingsBtns = document.querySelectorAll(".settings");
        this.settingsBtns.forEach((elem)=> this.handleTaskEdit(elem,this.app));
        
    }
    //It is currently assigned in render. but we can assign it in the display manager?
    handleTaskEdit(elem){
        elem.addEventListener("click", (e) => this.editTaskCallback(e));
    }
}