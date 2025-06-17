import "./styles.css";

import { Task, Project, Timer } from "./models/index.js";
import { AppController, load } from "./app/index.js";

function hasLocalStorage() {
  return Object.keys(localStorage).length != 0;
}

function populate(app) {
  const top = new Project("Web Development Journey");
  // const work = new Project("Project X");
  // top.generateExamples(1);
  // work.generateExamples(3);
  app.projectManager.addProject(top);
  // app.projectManager.addProject(work);
  // return app
}

const app = new AppController();
if (hasLocalStorage()) load(app);
else populate(app);

app.render();
