import type { DragDropTypes } from '../sharedTypes';

interface ProvidedDraggableProps {
  ref: React.RefObject<HTMLElement>;
  'data-draggable-id': string;
  'data-draggable-context-id': string;
}
interface ProvidedDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  draggable: false;
  'data-drag-handle-id': string;
  'data-drag-handle-context-id': string;
}
export interface DraggableChildrenProps {
  draggableProps: ProvidedDraggableProps;
  dragHandleProps: ProvidedDragHandleProps;
}

export interface DraggableProps {
  draggableId: string;
  type: DragDropTypes;
  idx: number;
  placeholderClassName?: string;
  children: (provided: DraggableChildrenProps) => JSX.Element;
}
