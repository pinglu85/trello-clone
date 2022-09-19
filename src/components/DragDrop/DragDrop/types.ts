interface DragDropResult {
  sourceIdx: number;
  destinationIdx: number;
  oldParentId: string;
  newParentId: string;
}
export type OnDragEnd = (dragDropResult: DragDropResult) => void;

export interface DragDropProps {
  onDragEnd: OnDragEnd;
  children: React.ReactNode;
}

export type SetGlobalStyles = (newStyles: string) => void;

export interface MousePosition {
  pageX: number;
  pageY: number;
  movementX: number;
  movementY: number;
}
