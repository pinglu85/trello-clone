import type { DroppableTypes } from '../types';

export interface DroppableProps {
  droppableId: string;
  type: DroppableTypes;
  children: React.ReactNode;
  className?: string;
}
