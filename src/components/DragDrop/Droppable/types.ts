import type { DragDropTypes } from '../sharedTypes';

export interface DroppableProps {
  droppableId: string;
  type: DragDropTypes;
  children: React.ReactNode;
  className?: string;
}
