export class ProjectManager {
  constructor() {
    this.activeKey = null;
    this.projects = new Map();
  }

  addProject(project) {
    /*
        Pretty little bug in the if clause due to 0 indexing of projectid:
        On init:
        - activeKey = null  !null (true)
        - activeKey = 0     !0 (also true)
        - activeKey is still true in the !0 if clause, assigning the 
        */
    if (this.activeKey === null) this.activeKey = project.id;
    this.projects.set(project.id, project);
  }

  getActiveProject() {
    const activeProject = this.projects.get(this.activeKey);
    if (!activeProject) {
      console.warn("No active project");
      return;
    }
    return activeProject;
  }

  switchProject(newKey) {
    // console.log(this.getActiveProject().ordering)
    this.activeKey = newKey;
    return this.getActiveProject();
  }

  removeProject(key) {
    this.projects.delete(key);
  }

  addTask(task) {
    this.getActiveProject().addTask(task);
  }

  removeTask(index) {
    this.getActiveProject().removeTask(index);
  }
}
