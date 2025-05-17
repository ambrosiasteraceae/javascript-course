import Task from "./task.js";
import Project from "./project.js";
import Timer, {HALFHOUR, FIFTEEN,FIVE} from "./timer.js"



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


class DOMManager{
    
}

