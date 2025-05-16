import Task from "./task.js";

export default class Project{
    static lastID = -1;

    // static getID(){
    //     console.log(lastID)
    // }
    
    #id;
    constructor(name, taskList =[])
    {
        this.#id = ++Project.lastID;
        this.name = name;
        this.tasks = taskList;
    }

    getID () {return this.#id;}

    setActiveTask(index){
        this.tasks[index].isWorkedOn = true;
    }
 
    addTask(task){
        this.tasks.push(task);
    }

    removeTask(taskIndex){
        this.tasks.splice(taskIndex,1);
    }

    
    listTasks(){
        for (let t of this.tasks)
            {t.print()}
        // return this.tasks.map((task) => task)
    }

    print(){
        console.log(this.tasks.map((task) => task.print()))
    }

    generateExamples(num)
    {
        for(let i=0; i<num; i++)
        {
            const name = `(Task ${i+1})`;
            const pomodoros = Math.round(10*Math.random())
            const task = new Task(name, pomodoros);
            this.addTask(task);
        }
    }

}