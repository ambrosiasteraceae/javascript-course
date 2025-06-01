import { show, hide} from "../events";  

export function handleTaskEditCancellation(fm){

    fm.currentTaskElement.isEdited = false;
    fm.isOpen = false;
    hide(fm.formDiv);
    show(fm.taskDiv);
    fm.taskDiv.after(fm.formDiv);
    if(fm.editMode)
    {
        fm.editMode = false;
        show(fm.currentTaskElement.el);
        fm.submitTaskBtn.textContent = "Add Task";       
    }
}

export function sendDataEvent(fm, app){
    fm.form.addEventListener("submit", (event) => {
    event.preventDefault();
    fm.sendData(app);
})}


export function bindFormEvents(fm){
    fm.initTaskFormBtn.addEventListener("click", () => {
            
            show(fm.formDiv);
            hide(fm.taskDiv);
        });

    fm.cancelTaskBtn.addEventListener("click",() => {
        handleTaskEditCancellation(fm)
            
        });
    
    document.addEventListener("keydown", (event)=>{
        if(event.key=="Escape")
            handleTaskEditCancellation(fm);
        });

    fm.addNotesBtn.addEventListener("click",() =>{
        show(fm.notes);
    });

    onOutsideClick(fm);
}

function onOutsideClick(fm)
{
    document.body.addEventListener("click",  (e) => { 
        if(fm.formDiv.classList.contains("hidden"))
            return

        if(!fm.isOpen)
        {
            fm.isOpen = true;
            return
        }
        if(!fm.form.contains(e.target))
            handleTaskEditCancellation(fm);});
    }