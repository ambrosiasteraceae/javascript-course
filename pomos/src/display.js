import Task from "./task.js";
import Project from "./project.js";
// import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
import { updateTime, updateTask } from "./index.js";
export class BaseElement {
    constructor(htmlElement){
        if(htmlElement.startsWith("."))
        {
            const selection = document.querySelector(htmlElement);
            // console.log(selection)
            if(selection)
                this.el = selection;
        }
        else
            this.el = document.createElement(htmlElement);      
    }

    append(child){
        // console.log("Child of:" , child, typeof child)

        const childElement = child instanceof BaseElement? child.el : child;
        this.el.appendChild(childElement);
    }

    setText(text){
        this.el.textContent = text;
    }

    addClass(className){
        // classNames.forEach((className) => this.el.addClass(className));
        this.el.classList.add(className);
    }
    removeClass(className){
        this.el.classList.remove(className)

    }

    addAttribute(attrName, attrValue){
        this.el.setAttribute(attrName,attrValue);
    }
    getAttribute(attrName){
        return this.el.getAttribute(attrName);
    }

    addEventListener(type, listener){
        return this.el.addEventListener(type, listener)
    }
    
}

class RadioElement extends BaseElement{
    constructor(htmlElement){
        super(htmlElement);
        this.addType("radio");
    }
    addName(radioName){
        this.el.name = radioName;
    }
    addType(radioType){
        this.el.type  = radioType;
    }

    setChecked(val){
        this.el.checked = val;
    }

}

export class TaskElement extends BaseElement{  
    constructor(task){
        
        super("div");
        this.task = task;
        this.el.dataset.key = task.key;
        this.elements = {};
        this.build();

    }
    
    build(){
        this.elements.taskId = new BaseElement("div");
        this.elements.taskId.setText(this.task.key);
        this.elements.taskId.addClass("id");


        this.elements.taskActive = new RadioElement("input");
        this.elements.taskActive.addName("task");
        this.elements.taskActive.addClass("disabled");
        this.elements.taskActive.addClass("radio");

        // console.log(this.taskActive);
        // console.log();
        
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

        this.addClass("task");
    }

    getTaskEntries(){
        return this.elements();
    }

    update(){
        // this.elements.taskActive.activate(this.task.isWorkedOn || false);
        this.elements.taskName.setText(this.task.name);
        this.elements.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.elements.taskTime.setText(this.task.timer.getTime());
    }

    setActive(){
        
        this.elements.taskActive.activate(this.task.isWorkedOn || false); //we might not even need it;

        if(this.classList.includes("active"))
            this.remove("active")
        else
            this.addClass("active")
    }

    destroy(){
        this.el.remove();
        }
}

export default class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.taskElements = new Map();
        
    }

    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
        this.container.append(taskElement);
        // return taskElement;
    }

    // addTask(t){
        
    //     if (t instanceof TaskElement)
    //         this.container.append(t);
    //     else
    //         this.container.append(this.createTaskElement(t));

    // }

    updateTask(id){
        const taskElement = this.taskElements.get(id);
        if(taskElement)
            taskElement.update();
    }

    updateAll(){
        this.taskElements.keys().forEach((id) => this.updateTask(id));
    }
    
    display(project){
        this.clear();

        // this.activeProject = project;
        project.tasks.forEach((task) => this.createTaskElement(task));
        this.addRadioClickEvent(project);
        // this.taskElements.values().forEach((taskElement) => this.container.append(taskElement));
        // this.container.append(this.taskElements);
    
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

    // switchActiveTask(id, project){

    //     project.switchTask(id);

    // }
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
        return this.getActiveProject();
    }

    removeProject(key){
        this.projects.delete(key);
    }
}

export class AppController{
    constructor(){
        this.displayManager = new DisplayManager(); 
        this.projectManager = new ProjectManager();
    }

    switch(key){
        this.projectManager.switchProject(key);
        this.displayManager.display(this.projectManager.getActiveProject());
    }
    
    addTask(task){
        this.projectManager.getActiveProject().addTask(task)
        this.displayManager.addTask(task);        
    }

    fillTemplates(numTasks){
        this.projectManager.getActiveProject().generateExamples();
    }
    
    getActiveTask(){
        return this.projectManager.getActiveProject().getActiveTask();
    }
    
    addProject(projectName){
        this.projectManager.addProject(projectName);
        this.display();
    }


    display(){
        this.displayManager.display(this.projectManager.getActiveProject());
    }
    
    switchTask(taskKey){


    }

    
    
    removeTask(){}
    // updateTask(){}
    

}

// export default class DisplayManager{
//     constructor()
//     {
//         this.projects = [];
//         this.active = 0;
//     }

//      addProject(project){

//         this.projects.push(project);
//         if (this.projects)
//             this.active = project;

//     }


//     populateProject(){

//         const projectElement = document.querySelector(".projects");
//         projectElement.innerHTML = "";
//         console.log(this.active.tasks)

//         for(const task of this.active.tasks)
//         {
//             const taskElement = document.createElement("div");
//             const taskId = document.createElement("div");
//             const taskActive = document.createElement("input");
//             const taskName = document.createElement("div");
//             const taskStatus = document.createElement("div");
//             const taskTime = document.createElement("div");
//             const taskSettings = document.createElement("div");

//             taskElement.classList.add("task");
//             taskId.classList.add("id");
//             taskActive.classList.add("disabled");
//             taskActive.classList.add("radio");
//             taskActive.name = "task";
//             taskActive.type = "radio";                    
//             taskName.classList.add("text");
//             taskStatus.classList.add("text");
//             taskSettings.classList.add("settings");
//             taskTime.classList.add("time")

//             taskId.textContent = `#${task.key}`;
//             taskActive.textContent = task.isWorkedOn;
//             taskName.textContent = task.name;
//             taskStatus.textContent = `${task.current}/${task.pomodoros}`;
//             taskTime.textContent = task.timer.getTime();
//             taskSettings.textContent = ":";

//             [taskId, taskActive, taskName, taskStatus, taskTime, taskSettings].forEach((t) => taskElement.appendChild(t));
//             taskElement.dataset.key = task.key;
//             projectElement.appendChild(taskElement);
//         }

//     }
// }









