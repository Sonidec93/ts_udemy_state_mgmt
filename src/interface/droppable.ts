export interface Droppable {
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
  }