import {Task, Timer} from "../models";

export function addRadioClickEvent(app, taskElement){
        
        taskElement.addEventListener("change", (e) => {
    
            const task = e.target.parentNode;
            const id = task.dataset.key;
            const activeTask = app.getActiveTask();
   
            if (activeTask)
            {
                if (activeTask.timer.running)
                    app.toggleState(activeTask);
            }     
            app.getActiveProject().switchTask(id);
            app.updateTime(); 
            app.updateTask();   
            app.updateNumber();
            console.log(app.getActiveTask());

        });
    }
export function  addRadioClickEvents(app){
    
        const iter = app.displayManager.taskElements.values();
        for(const taskElement of iter)
            addRadioClickEvent(app, taskElement)
            // this.addRadioClickEvent(taskElement);       
    }
export function attachEventListeners(app){
        app.timeElement.addEventListener("timechange", (e) => 
        {    
            const activeTask = app.getActiveTask();
            
            app.updateTime();
            if (activeTask.timer.duration == 0)
            {
                // console.log(1);
                activeTask.assignEndDate()
                activeTask.increment();
                // console.log(activeTask);
                app.updateTask();
                app.updateNumber();
                app.toggleState(activeTask);
                app.storageManager.storeProject(app.projectManager.getActiveProject());       
            }
        });
        
        app.timeElement.addEventListener("onrefresh",  () => app.updateTime())

        app.startBtn.addEventListener("click", () => {

            const activeTask = app.getActiveTask();
            if(!activeTask){
                console.warn("There is no active task to start")
                return
            }
            if(activeTask.isFinished) {
                console.warn("Cannot start a finished task. Increase the number of pomodoros");
                return;
            }
            if (!activeTask) return;
  
            app.toggleState(activeTask);
            if(activeTask.timer.duration == activeTask.timer.original)
                activeTask.assignStartDate();
        });
        
        app.resetBtn.addEventListener("click", () => {

            const activeTask = app.getActiveTask();
            if (!activeTask) return;
            activeTask.timer.refresh();
        });

        app.logBtn.addEventListener("click", () => {

            const activeTask = app.getActiveTask();
            if (!activeTask) return;
           console.log(activeTask);
        });
        
        //for now we will disable the switch project functionality.
        app.switchBtn.addEventListener("click", (event) =>  {
            
            return
            const project = app.getActiveProject();
            app.switch(project.id == 1? 0 : 1);
          
        });
        
        app.addBtn.addEventListener("click", (event) => {
            
            const options = {name: "Test", pomodoros:2};
            const timer = new Timer(Timer.ALMOSTONEHOUR);
            const task  = new Task(options, timer);
            // console.log("New task is being created:")
            app.addTask(task);
        })

        app.removeBtn.addEventListener("click", (event) => {
            const activeTask = app.getActiveTask();
            if(activeTask == undefined) return;
            if(activeTask.timer.running) app.toggleState(activeTask);
            const index = app.getActiveTask().key;
            console.log(`Removing task with id: ${index}`);
            app.deleteTask(index);
        });
    }
    

export function handleClickOutside(app){
    document.body.addEventListener("click",  (e) => {  

    });
}
