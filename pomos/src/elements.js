

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

export class RadioElement extends BaseElement{
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
        this.elements.taskActive.setChecked(this.task.isActive);

        //  console.log(this.task.isActive);
        //  console.log(this.elements.taskActive);
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
        // this.elements.taskActive.activate(this.task.isActive || false);
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