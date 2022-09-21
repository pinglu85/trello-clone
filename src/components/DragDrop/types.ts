interface DragDropResult {
  sourceIdx: number;
  destinationIdx: number;
  oldParentId: string;
  newParentId: string;
}
export type OnDragEnd = (dragDropResult: DragDropResult) => void;

export interface MousePosition {
  pageX: number;
  pageY: number;
  movementX: number;
  movementY: number;
}

export enum DragDropTypes {
  Row = 'ROW',
  Column = 'COLUMN',
}

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export type Droppables = Map<string, HTMLDivElement>;

export type EmptyDroppables = Set<HTMLDivElement>;

export interface DragDropData {
  isDragging: boolean;
  isRAFRunning: boolean;
  draggedElement: HTMLElement | null;
  draggedElementType: string;
  draggedElementRect: Rect;
  initDistanceFromDraggedElementLeftToMouseX: number;
  initDistanceFromDraggedElementTopToMouseY: number;
  draggedElementInitIdx: number;
  initParentId: string;
  destinationIdx: number;
  newParentId: string;
  droppables: Droppables;
  emptyDroppables: EmptyDroppables;
  placeholder: HTMLElement | null;
  placeholderClassName: string;
}
