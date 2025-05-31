import {Task, Timer } from "../models";
import {sendDataEvent} from "../events"
  
export class FormManager{
    constructor(app){
        
        this.app = app;
        this.editMode = false;
        this.taskEditKey = null;
        this.form = document.querySelector("form");
        this.formDiv = document.querySelector(".form");

        sendDataEvent(this, app)

    }

  editFromForm(data){

    const editTask =  this.app.getActiveProject().getTask(this.taskEditKey)
    editTask.name = data.name;
    editTask.pomodoros = data.pomodoros;
    editTask.notes = data.notes;
    console.log("submit was prevented due to edit mode")
    this.editMode = false;
    this.app.editTask(editTask);

  }


  createFromForm(data){
    const timers  = new Timer(15000);
    const task = new Task(data, timers)
    this.app.addTask(task);
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

        const child = e.target.parentNode;
        const parent = child.parentNode;
        
        parent.insertBefore(this.formDiv, child);
        this.formDiv.classList.remove("hidden");
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