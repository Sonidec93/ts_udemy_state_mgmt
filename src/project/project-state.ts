import { ProjectStatus } from '../enums/project-status';
import { ListenerFn } from '../types/listener';
import { Project } from './project';
import { State } from './state';


export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
  
    private constructor() { super() }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addListener(listenerFn: ListenerFn<Project>) {
      this.listeners.push(listenerFn);
    }
    move(id: string, state: ProjectStatus) {
      let project = this.projects.find(prj => prj.id == id);
      if (project && project.status!=state) {
        project.status = state;
        this.refreshList();
      }
    }
    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.active
      );
      this.projects.push(newProject);
      this.refreshList();
    }
    refreshList() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }