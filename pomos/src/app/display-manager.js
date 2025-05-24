import { BaseElement, TaskElement } from "../ui/index.js";

export class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.taskElements = new Map();

        this.displayBtn = document.querySelector(".display");
        this.displayBtn.addEventListener("click",() =>{this.updateAll();})
 
    }

    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
        this.container.append(taskElement);
    }

    removeTaskElement(index){
        this.taskElements.get(index).remove();
        this.taskElements.delete(index);
        console.log(this.taskElements)
        
    }


    updateTask(id){
        const taskElement = this.taskElements.get(id);
        if(taskElement)
            taskElement.update();
    }

    updateAll(){
        this.taskElements.keys().forEach((id) => this.updateTask(id));
    }

    renderTask(taskElement){
        this.container.append(taskElement);
    }
    
    render(project){
        this.clear();
        const iter = project.tasks.values();
        for (const task of iter)
            this.createTaskElement(task)    
    }

    
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }


}