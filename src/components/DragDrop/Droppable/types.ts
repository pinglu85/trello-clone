import type { DragDropTypes } from '../types';

export interface DroppableProps {
  droppableId: string;
  type: DragDropTypes;
  children: React.ReactNode;
  className?: string;
}
