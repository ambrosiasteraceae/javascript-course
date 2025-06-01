import { BaseElement, TaskElement } from "../ui/index.js";
import {  bindDisplayEvents, 
     attachDragOverEvent,
     removeDragOverEvent,
     handleDragState } from "../events/display-events.js";
export class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.attached = false;
        this.taskElements = new Map();
                       
        this.initializeForm();
     
    }
    initializeForm(){  
        this.displayBtn = document.querySelector(".display");
        bindDisplayEvents(this);
    }

    getEditedTask(){
        return [...this.taskElements.values()].filter((ele) => ele.isEdited==true)[0];
    }


    getTaskElement(key){
        return this.taskElements.get(key);
    }
    
    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
    }

    removeTaskElement(index){
        this.taskElements.get(index).remove();
        this.taskElements.delete(index);}

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
        handleDragState(taskElement);
    }

    getOrder(project){

        if(this.container.el.children == 0)
            return project.ordering
        else
        {
            project.ordering = [];
            for (const ele of this.container.el.children)
                project.ordering.push(Number(ele.dataset.key));
        }
        return project.ordering      
    }

    
    render(project){

        if (project.ordering.length==0)
        {
            console.warn("Project Ordering is equal to 0")
            return
        }
        this.clear();        
        const iter = project.tasks.values();
        for (const task of iter)
            this.createTaskElement(task);
        
        for (const index of project.ordering)
        {
            let taskElement = this.taskElements.get(index);
            this.renderTask(taskElement);
        }

        if(!this.attached)
            attachDragOverEvent(this, project);
    }
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }

}
 