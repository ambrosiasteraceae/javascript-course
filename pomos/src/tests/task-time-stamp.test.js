jest.useFakeTimers();

import { Task,Timer } from "../models/index.js";

describe("Task Time Stamp", () => {
    

    const timer = new Timer(1000);
    const task = new Task( {name:"test",pomodoros:2,} , timer);


    it("timestamp container init", () => {
        expect(task.timestamps).toBeDefined();
    });
    it("is created with size of pomodoros", () => {
        expect(task.timestamps.length).toEqual(task.pomodoros)
    });
    it("each tuple has size two", () => {
        expect(task.timestamps[0].length).toEqual(2)
    });
    it("a timestamp is added when a task is started", () => {
        const timer = new Timer(1000);
        const task = new Task( {name:"test",pomodoros:2,} , timer);
        task.timer.toggle();
        task.assignStartDate();
        // task.startTimer()
        // jest.advanceTimersByTime(timer.original);
        expect(task.timestamps[task.current][0]).not.toBeNull();
    });
    it("a timestamp is added when a task is finished", () =>  {
        const timer = new Timer(1000);
        const task = new Task( {name:"test",pomodoros:2,} , timer);
        task.timer.toggle();
        task.assignStartDate();
        
        jest.advanceTimersByTime(timer.original);
        task.increment();
        expect(task.timestamps[0][1]).not.toBeNull();
    });

    it("timestamp works on current task",() => {
        const timer = new Timer(1000);
        const task = new Task( {name:"test",pomodoros:2,} , timer);
        task.timer.toggle();
        task.assignStartDate();
        jest.advanceTimersByTime(1000);
        task.timer.toggle();
        task.assignEndDate();
        task.increment();
        console.log(task)

        //Second run

        task.timer.toggle();
        task.assignStartDate();
        jest.advanceTimersByTime(3000);
        task.timer.toggle();
        task.assignEndDate();
        task.increment();
        console.log(task);
        expect(task.timestamps[1][0]).not.toBeNull();
        expect(task.timestamps[1][1]).not.toBeNull();
        
    })
    it("increases accordingly to the pomodoros",  () => {
      task.addPomodoros(3);
      expect(task.timestamps.length).toEqual(task.pomodoros)  
    });
    it("decreases accoridngly to the pomodoros", () =>  {

        const timer = new Timer(1000);
        const task = new Task( {name:"test",pomodoros:5,} , timer);
    
        jest.advanceTimersByTime(5000);
        task.timer.toggle();
        task.assignStartDate();
        jest.advanceTimersByTime(3000);
        task.timer.toggle();
        task.assignEndDate();
        task.increment();
        expect(task.timestamps[0][1]).not.toBeNull();
        
        task.addPomodoros(-2);
        expect(task.timestamps.length).toEqual(task.pomodoros)
        console.log(task)

    });

})