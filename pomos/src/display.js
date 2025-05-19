import Task from "./task.js";
import Project from "./project.js";
// import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"
/*
Notes:
- How is this current task and base classing better than what I have before>?
- I fail to see how its better. Maybe my class structure is wrong
- I havent stopped and asked, what is the functionality that I need to have so I know what to class..
- In task element, should this.el.dataset.key be set as task.key or this.task.key?
- Is taskId necessary since we have dataset.key? Only for display, better to show
- These subclasses should be somewhat generic and reusuable. Is that the case?
- how can I better write my classes so that I can both construct and update, not repeating
    element.setText() on all items when I have to update
- I find it very hard and confusing to know with high certainity what is the best course for:
    -> should display manager store the project classes as well?
    -> should display manager be the one that assigns which active project we are looking at?
    -> or should it be a different class>?
    -> anohter way to frame it, does it just cater for dom dislayu and taskElements or also mingles in project class storage?

- More generally, I have a problem with separation of concers. Any references I Could Read?

- class NewDisplayManager{
    constructor()
     {
        this.projects = [];
     }
    
     addProject(project){
        this.projects.push(project);
        if (this.projects)
            this.active = project;
    } -> is it okay to create this.active on add project or should I have initialized with a null value in constructor?
        
    */


export class BaseElement {
    constructor(htmlElement){
        if(htmlElement.startsWith("."))
        {
            const selection = document.querySelector(htmlElement);
            console.log(selection)
            if(selection)
                this.el = selection;
        }
        else
            this.el = document.createElement(htmlElement);      
    }

    append(child){
        console.log("Child of:" , child, typeof child)
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
        this.elements.taskActive.activate(this.task.isWorkedOn || false);
        this.elements.taskName.setText(task.name);
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
        // this.activeProject = null;
    }

    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
        
        return taskElement;
    }

    addTask(t){
        
        if (t instanceof TaskElement)
            this.container.append(t);
        else
            this.container.append(this.createTaskElement(t));

    }

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
        project.tasks.forEach((task) => this.addTask(task));
        this.taskElements.values().forEach((taskElement) => this.container.append(taskElement));
        // this.container.append(this.taskElements);
    }

    clear(){
        // this.remove();
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }

}

export  class ProjectManager{
    //
    constructor(){
        this.activeKey = null;
        this.projects = new Map();

    }

    addProject(name){
        const project = new Project(name)
        if(!this.activeKey)
            this.activeKey = project.id; 
        this.projects.set(this.id, project);

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









