// import Task from "./task.js";
// import Project from "./project.js";
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
    /*
    - introduce error handling for the initiqalizxaiton 
        - what happens if the provided htmlstring is not a valid selector nor element? 
    */

    constructor(htmlElement){
        // If element is selected we should be able to select it based on class name, not select the elements that have a div
        // in current form if you document.querySelector(htmlElement ) where htmlElement = div will result in div.main e.g resulting the first div it finds.
        // 
        const selection = document.querySelector(`.${htmlElement}`);
        // console.log("selection is", selection)
        if(!selection)
            {
                this.el = document.createElement(htmlElement);
                // console.log(this.el)
                return
            }
        this.el = selection;
      
    }
    append(child){
        this.el.appendChild(child.el);
    }

    setText(text){
        this.el.textContent = text;
    }

    addClass(className){
        // classNames.forEach((className) => this.el.addClass(className));
        this.el.classList.add(className);
    }
    
}

export class TaskElement extends BaseElement{
    
    constructor(task){
        
        super("div");
        this.task = task;
        this.build();
        this.el.dataset.key = task.key;

    }
    
    build(){
        this.taskId = new BaseElement("div");
        this.taskId.setText(this.task.key);
        this.taskId.addClass("id");


        this.taskActive = new RadioElement("input");
        this.taskActive.addName("task");
        this.taskActive.addType("radio");
        this.taskActive.addClass("disabled");
        this.taskActive.addClass("radio");

        console.log(this.taskActive);
        console.log();
        this.taskName = new BaseElement("div");
        this.taskName.setText(this.task.name);
        this.taskName.addClass("text");


        this.taskStatus = new BaseElement("div");
        this.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.taskStatus.addClass("text");
    

        this.taskSettings = new BaseElement("div");
        this.taskSettings.setText(":");
        this.taskSettings.addClass("settings");

        this.taskTime = new BaseElement("div");
        this.taskTime.setText(this.task.timer.getTime());

        
        [this.taskId.el, this.taskActive.el, this.taskName.el, this.taskStatus.el, this.taskTime.el, this.taskSettings.el]
        .forEach((t) => this.el.append(t));

        //See now its this not this.el
        this.addClass("task");
    }


    update(){
        this.taskActive.addName("task");
        this.taskName.setText(task.name);
        this.taskStatus.setText(`${this.task.current}/${this.task.pomodoros}`)
        this.taskTime.setText(this.task.timer.getTime());
    }
}

class RadioElement extends BaseElement{
    constructor(htmlElement){
        super(htmlElement);
    }
    addName(radioName){
        this.el.name = radioName;
    }
    addType(radioType){
        this.el.type  = radioType;
    }
}

export class NewDisplayManager{
    constructor()
     {
        this.projects = [];
     }
    
     addProject(project){
        this.projects.push(project);
        if (this.projects)
            this.active = project;
    }

    switchProject(projIndex){
        this.active = this.projects[projIndex];
    }

    build(){

        this.project = new BaseElement("projects");
        // console.log("Inside build project")
        // console.log(this.project)
        // this.project.addClass("project");
        this.project.setText("MyProject");      
        for(const task of this.active.tasks)
        {
            const taskElement = new TaskElement(task);
 
            this.project.append(taskElement)

        }
    }

}

export default class DisplayManager{

    constructor()
    {
        this.projects = [];
        this.active = 0;
    }

     addProject(project){

        this.projects.push(project);
        if (this.projects)
            this.active = project;

    }


    populateProject(){

        const projectElement = document.querySelector(".projects");
        projectElement.innerHTML = "";
        console.log(this.active.tasks)

        for(const task of this.active.tasks)
        {
            const taskElement = document.createElement("div");
            const taskId = document.createElement("div");
            const taskActive = document.createElement("input");
            const taskName = document.createElement("div");
            const taskStatus = document.createElement("div");
            const taskTime = document.createElement("div");
            const taskSettings = document.createElement("div");

            taskElement.classList.add("task");
            taskId.classList.add("id");
            taskActive.classList.add("disabled");
            taskActive.classList.add("radio");
            taskActive.name = "task";
            taskActive.type = "radio";                    
            taskName.classList.add("text");
            taskStatus.classList.add("text");
            taskSettings.classList.add("settings");
            taskTime.classList.add("time")

            taskId.textContent = `#${task.key}`;
            taskActive.textContent = task.isWorkedOn;
            taskName.textContent = task.name;
            taskStatus.textContent = `${task.current}/${task.pomodoros}`;
            taskTime.textContent = task.timer.getTime();
            taskSettings.textContent = ":";

            [taskId, taskActive, taskName, taskStatus, taskTime, taskSettings].forEach((t) => taskElement.appendChild(t));
            taskElement.dataset.key = task.key;
            projectElement.appendChild(taskElement);
        }

    }
}










