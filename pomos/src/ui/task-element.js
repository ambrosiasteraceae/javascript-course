import { BaseElement } from "./base-element.js";
import { RadioElement } from "./radio-element.js";

export class TaskElement extends BaseElement{  
    constructor(task){
        
        super("div");
        this.task = task;
        this.el.dataset.key = task.key;
        this.elements = {};
        this.build();
        this.attached = false;
        this.isEdited = false;
    }
    
    build(){
        this.elements.taskId = new BaseElement("div");
        this.elements.taskId.setText(this.task.key);
        this.elements.taskId.addClass("id");


        this.elements.taskActive = new RadioElement("input");
        this.elements.taskActive.addName("task");
        this.elements.taskActive.addClass("disabled");
        this.elements.taskActive.addClass("radio");
        this.elements.taskActive.setChecked(this.task.isActive);

        
        this.elements.taskName = new BaseElement("div");
        this.elements.taskName.setText(this.task.name);
        this.elements.taskName.addClass("text");


        this.elements.taskStatus = new BaseElement("div");
        this.elements.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.elements.taskStatus.addClass("text");
    

        this.elements.taskSettings = new BaseElement("div");
        this.elements.taskSettings.setText(":");
        this.elements.taskSettings.addClass("settings");

        this.elements.taskTime = new BaseElement("div");
        this.elements.taskTime.setText(this.task.timer.getTime());

        
        Object.values(this.elements).forEach((taskEntry) => this.el.append(taskEntry.el));

        this.addAttribute("draggable", "true");
        this.addClass("task");
        this.addClass("draggable");
    }

    getTaskEntries(){
        return this.elements();
    }

    update(){
        
        this.elements.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.elements.taskName.setText(this.task.name);
        this.elements.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.elements.taskTime.setText(this.task.timer.getTime());
    }

    setActive(){
        
        this.elements.taskActive.activate(this.task.isActive || false); //we might not even need it;

        if(this.classList.includes("active"))
            this.remove("active")
        else
            this.addClass("active")
    }

    destroy(){
        this.el.remove();
        }
}