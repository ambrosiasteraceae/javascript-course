import { BaseElement, TaskElement } from "../ui/index.js";

export class DisplayManager{
    constructor()
    {
        this.container = new BaseElement(".projects")
        this.attached = false;
        this.taskElements = new Map();
       

        this.displayBtn = document.querySelector(".display");
        this.displayBtn.addEventListener("click",() =>{this.updateAll();})
        
        
 
    }

    createTaskElement(task){
        const taskElement = new TaskElement(task)
        this.taskElements.set(task.key, taskElement);
        // this.container.append(taskElement);
    }

    removeTaskElement(index){
        this.taskElements.get(index).remove();
        this.taskElements.delete(index);
        //console.log(this.taskElements)
        
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

    attachDragEvents(taskElement){  
        //Set flag to true so we will no longer attach listeners
        if (taskElement.attached)
            return    
        
        taskElement.attached = true;

        taskElement.addEventListener("dragstart", () => {   
            console.log("drag start");
            taskElement.addClass("dragging");
        });

        taskElement.addEventListener("dragend", () => {
            console.log("dragend");
            taskElement.removeClass("dragging");
        });
    }

    getOrder(project){
        /*
            If we do not have a container initialized (new project) we default
            the ordering to the initial one.
            We take ordering based on the current div element order.
        */

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
        
        // console.log(project.ordering)
        // if (project.ordering.length==0)
        // {
        //     console.warn("Project Ordering is equal to 0")
        //     return
        // }


        // this.clear();
        
        // const iter = project.tasks.values();
        // for (const task of iter)
        //     this.createTaskElement(task);
        
        // // console.log("newOrderis:", project.ordering);
        
        // for (const index of project.ordering)
        // {
        //     console.log("Index is:", index);
        //     let taskElement = this.taskElements.get(index);
        //     this.renderTask(taskElement);
        //     this.attachDragEvents(taskElement);
        // }

        // if(!this.attached)
        //     this.attachDragOverEvent(project);



        this.clear();
        const iter = project.tasks.values();
        for (const task of iter)
        {
            this.createTaskElement(task);
            let taskElement = this.taskElements.get(task.key);
            this.renderTask(taskElement);
            this.attachDragEvents(taskElement);
        }

        if(!this.attached)
            this.attachDragOverEvent(project);
    
    }

    
    clear(){
        this.taskElements.forEach((taskElement) => taskElement.destroy());
        this.taskElements.clear();
        this.activeProject = null;
        this.container.innerHTML = "";
    }

    removeDragOverListener(){
        this.attached = false;
        this.container.removeEventListener("dragover", this.dragOverListener);
        console.log("Removeing")
    }


    dragOverListener(e, project){
        e.preventDefault();
            const afterElement = this.getDragAfterElement(e.clientY);
            const draggable = document.querySelector(".dragging")
            // console.log(afterElement);
            if(afterElement == null)
                this.container.append(draggable);
            else
            {   
                // project.ordering = this.getOrder(project);
                this.container.insertBefore(draggable, afterElement);
            };
        
    }

    attachDragOverEvent(project){
        // we will no longer attach an event listener for the object
        this.attached = true;
        this.container.addEventListener("dragover", (e) => this.dragOverListener(e,project)) ;

    }
    getDragAfterElement(y)  {
    const draggableElements = [...this.container.el.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) =>{
        const box = child.getBoundingClientRect();        
        const offset = y - box.top - box.height/2;

        if(offset < 0 && offset> closest.offset)
            return  {offset:offset, element:child}
        else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element}


}
 