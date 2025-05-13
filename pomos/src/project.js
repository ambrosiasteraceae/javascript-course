import Task from "./task.js";

export default class Project{
    
    constructor(name, taskList =[])
    {
        this.name = name;
        this.tasks = taskList;
    }

 
    addTask(task){
        this.tasks.push(task);
    }

    removeTask(taskIndex){
        this.tasks.splice(taskIndex,1);
    }

    
    listTasks(){
        return this.tasks.map((task) => task.name)
    }

    generateExamples(num)
    {
        for(let i=0; i<num; i++)
        {
            const name = `(Task ${i+1})`;
            const pomodoros = (i) % 5;
            const task = new Task(name, pomodoros);
            this.addTask(task);
        }
    }

}