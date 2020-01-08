import { ProjectStatus } from '../enums/project-status';
import { Droppable } from '../interface/droppable';
import { autobind } from '../validators/auto-bind-decorator';
import { Component } from './component';
import { Project } from './project';
import { ProjectItem } from './project-item';
import { ProjectState } from './project-state';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Droppable {
    @autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer!.types[0] == 'text/plain') {
        event.preventDefault();
        this.element.querySelector('ul')!.classList.add('droppable');
      }
    }
    @autobind
    dragLeaveHandler(_event: DragEvent): void {//if we append _ in the begin of unused variable the tsc compiler stops giving warning
      this.element.querySelector('ul')!.classList.remove('droppable');
    }
    @autobind
    dropHandler(event: DragEvent): void {
      const id = event.dataTransfer!.getData('text/plain');
      ProjectState.getInstance().move(id, this.type == 'active' ? ProjectStatus.active : ProjectStatus.finished);
    }
    assignedProjects: any[];
  
    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];
      this.configure();
      this.renderContent();
    }
    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('drop', this.dropHandler)
      this.element.addEventListener('dragleave', this.dragLeaveHandler)
  
      ProjectState.getInstance().addListener((projects: Project[]) => {
        this.assignedProjects = projects.filter(project => ProjectStatus[project.status] == this.type);
        this.renderProjects();
      });
    }
  
    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      if (listEl.hasChildNodes()) {//LOGIC TO REMOVE CHILD NODES IF PRESENT
        for (let i = 0; i < listEl.childElementCount; i++) {
          listEl.removeChild(listEl.childNodes[i]);
        }
      }
      for (const prjItem of this.assignedProjects) {
        let projectItem = new ProjectItem(prjItem, 'single-project', this.element.querySelector('ul')!.id);
        projectItem.configure();
      }
    }
  
    private renderContent() {
  
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
    }
  
  }