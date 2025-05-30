function hide(elem){
    elem.classList.add("hidden");
}

function show(elem){
    elem.classList.add("show");
}

export function bindFormInitEvents(dm){
        

       dm.addNotesBtn.addEventListener("click",() =>{
                show(dm.notes);
            });
        dm.initTaskFormBtn.addEventListener("click", () =>{
                
                show(dm.formDiv);
                hide(dm.taskDiv);
            });

        dm.cancelTaskBtn.addEventListener("click",() =>{
                hide(dm.formDiv);
                show(dm.taskDiv);
                dm.hasEnterClick = !dm.hasEnterClick;
            });
        document.addEventListener("keydown", (event)=>{
                if(event.key=="Escape")
                {
                    hide(dm.formDiv);
                    show(dm.taskDiv);
                    dm.hasEnterClick = !dm.hasEnterClick;
                }
            });

        dm.displayBtn.addEventListener("click",() =>{dm.updateAll();})
        
        handleClickOutside(dm);
}


function dragOver(dm, e, project){
        e.preventDefault();
            const afterElement = getDragAfterElement(dm, e.clientY);
            const draggable = document.querySelector(".dragging");
            if(afterElement == null)
                dm.container.append(draggable);
            else        
                dm.container.insertBefore(draggable, afterElement);

    }

function  getDragAfterElement(dm, y)  {
    const draggableElements = [...dm.container.el.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) =>{
        const box = child.getBoundingClientRect();        
        const offset = y - box.top - box.height/2;

        if(offset < 0 && offset> closest.offset)
            return  {offset:offset, element:child}
        else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element}


export function attachDragOverEvent(dm, project){
        
        dm.attached = true;
        dm.container.addEventListener("dragover", (e) => dragOver(dm, e, project)) ;
    }

export function removeDragOverEvent(dm){
        dm.attached = false;
        dm.container.removeEventListener("dragover", dragOver);
        console.log("Removeing")
    }

export function handleDragState(taskElement){  
        //Set flag to true so we will no longer attach listeners
        if (taskElement.attached)
            return    
        
        taskElement.attached = true;

        taskElement.addEventListener("dragstart", () => {   
            console.log("drag start");
            console.log("what the fuck")
            taskElement.addClass("dragging");
        });

        taskElement.addEventListener("dragend", () => {
            console.log("dragend");
            taskElement.removeClass("dragging");
        });
    }



function handleClickOutside(dm){
    document.body.addEventListener("click",  (e) => {    
            if(!dm.hasEnterClick)
            {
                    dm.hasEnterClick = true;
                    return
            }
            if(!dm.formDiv.classList.contains("hidden"))
            {
                    if(dm.formDiv.contains(e.target))
                        console.log("I was inside");            
                    else
                    {
                        console.log("I was clicked outside");
                        dm.formDiv.classList.add("hidden")
                        dm.taskDiv.classList.remove("hidden");
                        dm.hasEnterClick = false;
                    }
            }});
        }