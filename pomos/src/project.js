import Task from "./task.js";
import Timer, {HALFHOUR, FIFTEEN} from "./timer.js"

export default class Project{
    static lastID = -1;

    // static getID(){
    //     console.log(lastID)
    // }
    current;
    #id;
    constructor(name, taskList =[])
    {
        this.#id = ++Project.lastID;
        this.name = name;
        this.tasks = taskList;
    }


    get id () {return this.#id;}

    setActiveTask(index){
        this.tasks[index].isWorkedOn = true;
    }

    getTaskbyID(taskID){
        const found = this.tasks.find((task) => task.key == taskID);
        if(found)
            return found
        console.log("Not found");
    }

    getActiveTask(){
         const activeTask = this.tasks.filter((task) => task.isWorkedOn == true)[0];
         return activeTask;
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
    }

    print(){
        console.log(this.tasks.map((task) => task.print()))
    }

    generateExamples(num)
    {
        for(let i=0; i<num; i++)
        {
            const name = `(Task ${i+1})`;
            // const pomodoros = Math.round(10*Math.random());
            const pomodoros = i+1;
            const taskConfig = {name, pomodoros};
            const timer = new Timer(5000*(i+1));
            const task = new Task(taskConfig, timer);

            this.addTask(task);
        }
    }

}