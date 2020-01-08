import { autobind as Autobind } from '../validators/auto-bind-decorator';
import { Draggable } from '../interface/draggable';
import { Component } from './component';
import { Project } from './project';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    @Autobind
    dragStartHandler(event: DragEvent): void {
     event.dataTransfer!.setData('text/plain',this.project.id);
     event.dataTransfer!.effectAllowed='move';
    }
    dragStopHandler(event: DragEvent): void {
      console.log(event);
    }
  
    constructor(private project: Project, templateId: string, hostElementId: string) {
      super(templateId, hostElementId, false, project.id);
      this.configure();
    }
    get numOfPeople() {
      return this.project.numOfPeople == 1 ? `${this.project.numOfPeople} person` : `${this.project.numOfPeople} persons`;
    }
  
    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragStopHandler);
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('b')!.textContent = this.numOfPeople;
      this.element.querySelector('p')!.textContent = this.project.description;
    };
  
  }