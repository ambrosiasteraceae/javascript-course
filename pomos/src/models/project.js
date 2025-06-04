import {Task} from "./task.js";
import  {Timer,HALFHOUR, FIFTEEN} from "./timer.js"

export class Project{
    static lastID = -1;

    // current;
    // _id;
    constructor(name)
    {
        this._id = ++Project.lastID;
        this.name = name;
        this.tasks = new Map();
        this.ordering = [];
    }

    getTask(key){
        return this.tasks.get(key);
    }


    get id () {return this._id;}

    switchTask(index){
        if (!index)
        {
            console.log("No Index Was Provided")
            return 
        }

        const curr = this.getActiveTask();
        
        //on initialization there is no active task so current returns null
        if(curr)
            curr.isActive = false;
        this.setActiveTask(index);
    }

    setActiveTask(index){
        index = Number(index);
         this.tasks.get(index).isActive = true;
    }

    
    getActiveTask(){
    
        const taskIterator = this.tasks.values();
        const activeTask = [...taskIterator].filter((task) => task.isActive == true)[0];
        return activeTask

        
    }
 
    addTask(task){
        this.tasks.set(task.key, task);
        this.ordering.push(task.key);
    }

    removeTask(taskIndex){
        this.tasks.delete(taskIndex)

    }

    listTasks(){
        for (let t of this.tasks.values())
            console.log(t);
    }

    generateExamples(num)
    {
        for(let i=0; i<num; i++)
        {
            const name = `(Task ${i+1})`;
            // const pomodoros = Math.round(10*Math.random());
            const pomodoros = i+1;
            const taskConfig = {name, pomodoros};
            const timer = new Timer(HALFHOUR-i*600000);
            const task = new Task(taskConfig, timer);

            this.addTask(task);
        }
    }

}