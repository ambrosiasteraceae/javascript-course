import { Task, Timer, Project } from "../models";

export function load(app) {
  let max = 0;
  for (let loadedProj of Object.values(localStorage)) {
    let parsed = JSON.parse(loadedProj);
    let lproj = new Project(`${parsed.name}`);
    const tts = parsed.tasks;
    lproj._id = Number(parsed._id);

    for (let t of [...Object.values(tts)]) {
      if (t._key > max) max = t._key;
      console.log(max);
      lproj.addTask(StorageManager.populateItem(t));
    }
    lproj.ordering = parsed.ordering;
    app.projectManager.addProject(lproj);
  }
  Task.lastKey = max;
}

export class StorageManager {
  static populateItem(jsonTask) {
    const ti = new Timer(jsonTask.timer.duration, jsonTask.timer.original);

    ti.running = jsonTask.timer.running;
    ti.startedAt = jsonTask.timer.startedAt;
    ti.finishedAt = jsonTask.timer.finishedAt;
    const ta = Task.clone(jsonTask, ti);
    return ta;
  }

  constructor(app) {
    this.saveBtn = document.querySelector(".save");
    this.saveBtn.addEventListener("click", () => {
      this.save(app);
    });
    this.clearBtn = document.querySelector(".clear");
    this.clearBtn.addEventListener("click", () => {
      //Prevent user from clearing progress. Future me will say thanks.
      return;
      localStorage.clear();
    });
  }

  /*
    we save only once. we are then just keeping track of updates
    we update when a task is created or when a task is being updated.
    we should also add a new key when a new project is added.
    */

  removeItem(project) {
    this.storeProject(project);
  }

  storeProject(project) {
    console.log("local storage  updated");
    const proj = {};
    const tasks = {};
    for (let [tKey, tValue] of project.tasks) tasks[tKey] = tValue;
    proj["name"] = project.name;
    proj["_id"] = project._id;
    proj["ordering"] = project.ordering;
    proj["tasks"] = tasks;

    localStorage.setItem(project._id, JSON.stringify(proj));
  }

  save(app) {
    const projects = [...app.projectManager.projects.values()];
    const data = {};
    for (let project of projects) {
      console.log(project);
      this.storeProject(project);
    }
    console.log(localStorage);
  }
}
