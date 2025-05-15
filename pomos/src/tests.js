import Task from "./task.js";
import Project from "./project.js";
import Session from "./session.js";

function TaskTestSuite1(){
    const tsk1 = new Task("Webpack", 2, "something");
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.addPomodoros(3);
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.addPomodoros(2);
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.increment();
    tsk1.print();
    tsk1.addPomodoros(1);
    tsk1.print();
    tsk1.addPomodoros(-1);
    tsk1.print();
    tsk1.addPomodoros(-1);
    tsk1.print();
    tsk1.addPomodoros(-1);
    tsk1.print();
    tsk1.addPomodoros(10);
    tsk1.print();

}

function ProjectTestSuite1(){
    const test = new Project("Test");
    test.generateExamples(5);
    console.log(test.listTasks())

    const other = new Project("Test");
    other.generateExamples(9);
    console.log(other.listTasks())
}

function ProjectTestSuite2(){
    
    const trial = new Project("trial");
    trial.generateExamples(10);
    // console.log(trial.tasks)
    console.log(trial.listTasks())
    trial.addTask(new Task("task=oks", 10))
    console.log(trial.listTasks())
    trial.removeTask(-1)
    console.log(trial.listTasks())
    trial.addTask(new Task("task=oks2", 5))
    trial.removeTask(0);
    console.log(trial.listTasks())
    console.log(trial.getID())
}
// TaskTestSuite1();
// ProjectTestSuite1();
// ProjectTestSuite2();

