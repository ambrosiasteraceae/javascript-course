import { show, hide} from "../events";  

export function handleTaskEditCancellation(fm){

    fm.isOpen = false;
    hide(fm.formDiv);
    show(fm.taskDiv);
    fm.taskDiv.after(fm.formDiv);
    if(fm.editMode)
    {
        fm.currentTaskElement.isEdited = false;
        fm.editMode = false;
        show(fm.currentTaskElement.el);
        fm.submitTaskBtn.textContent = "Add Task";       
    }
    console.log(fm.formDiv)
    clearForm();
}

export function sendDataEvent(fm, app){
    fm.form.addEventListener("submit", (event) => {
    event.preventDefault();
    fm.sendData(app);
    clearForm();
})}


export function bindFormEvents(fm){
    fm.initTaskFormBtn.addEventListener("click", () => {
            
            show(fm.formDiv);
            hide(fm.taskDiv);
            document.getElementById("task-name").focus(); //repeated in edit mode as well.
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


function clearForm(){
    document.getElementById("task-name").value = "";
    document.getElementById("pomodoro").value = "";
    document.getElementById("notes").value = "";
}