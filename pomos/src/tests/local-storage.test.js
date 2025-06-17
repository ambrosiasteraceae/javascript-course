import { StorageManager } from "../app";
import { Task, Timer } from "../models";
describe("Local Storage Output", () => {
  // localStorage.clear();
  const timer = new Timer(1000);
  const task = new Task({ name: "test", pomodoros: 4 }, timer);

  it("local storage to be defined", () => {
    expect(StorageManager).toBeDefined();
  });

  it("add task to storage", () => {
    localStorage.setItem(task.key, JSON.stringify(task));

    expect(localStorage.length).toEqual(1);
  });

  it("Task methods can be used after loaded from storage", () => {
    localStorage.setItem(task.key, JSON.stringify(task));
    const item = JSON.parse(localStorage.getItem(task.key));
    console.log(item);
    const newTask = Object.assign(task, item);
    // console.log(newTask instanceof Task);
    // console.log(task instanceof Task)

    newTask.addPomodoros(3);
    expect(newTask.pomodoros).toEqual(7);
    expect(newTask.timestamps.length).toEqual(7);
    console.log(newTask); // newTask.timer.toggle();
    console.log(newTask.timer.running);
    // newTask.timer.toggle();
    expect(newTask.timer.running).toBe(true);
  });
});
