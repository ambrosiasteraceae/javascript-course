import { BaseElement, TaskElement } from "../ui/index.js";
import {  bindFormInitEvents, attachDragOverEvent, removeDragOverEvent, handleDragState } from "../events/display-events.js";
export class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.attached = false;
        this.taskElements = new Map();
       
        this.hasEnterClick = false;           
        this.initializeForm();
     
    }
    
    initializeForm(){
        this.formDiv = document.querySelector(".form");
        this.taskDiv = document.querySelector(".before-form");
        this.notes = document.querySelector(".notes");

        this.addNotesBtn = document.querySelector(".expansion");
        this.cancelTaskBtn =document.querySelector(".cancel");
        this.initTaskFormBtn = document.querySelector(".add-task")
        this.submitTaskBtn = document.querySelector(".submit");      
        this.displayBtn = document.querySelector(".display");
        bindFormInitEvents(this);
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
        // So the project.ordering does not switch when the other porject has
        // dragged elements as well,
        // when a switch is performed, the new project tries to access indeces
        // from the last active project.
        // it was because the callback function of this.container for the draggable logic was only defined once?
        console.log(project.ordering)
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
            handleDragState(taskElement);
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
 