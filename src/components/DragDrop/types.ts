export enum DroppableTypes {
  Row = 'ROW',
  Column = 'COLUMN',
}

export interface PointerPosition {
  pageX: number;
  pageY: number;
  movementX: number;
  movementY: number;
}

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export type EmptyDroppables = Map<HTMLDivElement, DroppableTypes>;

export interface DragDropData {
  isDragging: boolean;
  pointerPosition: PointerPosition;
  draggedElement: HTMLElement | null;
  draggedElementRect: Rect;
  initDistanceFromDraggedElementLeftToMouseX: number;
  initDistanceFromDraggedElementTopToMouseY: number;
  droppableType: string;
  draggedElementIdx: number;
  destinationIdx: number;
  initParentId: string;
  newParentId: string;
  emptyDroppables: EmptyDroppables;
  placeholder: HTMLElement | null;
  placeholderClassName: string;
}

interface DragDropResult {
  sourceIdx: number;
  destinationIdx: number;
  oldParentId: string;
  newParentId: string;
}

export type OnDragEnd = (dragDropResult: DragDropResult) => void;

export type SetGlobalStyles = (newStyles: string) => void;

export interface DragDropContextInterface {
  dragDropData: DragDropData;
  onDragEnd: OnDragEnd;
  setGlobalStyles: SetGlobalStyles;
}

export interface DragDropProps {
  onDragEnd: OnDragEnd;
  children: React.ReactNode;
}
