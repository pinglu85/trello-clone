import isDraggable from './isDraggable';
import getClosestDroppable from './getClosestDroppable';
import intersect from './intersect';
import type { DragDropData } from '../../sharedTypes';

function findCurrDroppable(
  eventTarget: EventTarget | null,
  { draggedElementRect, emptyDroppables }: DragDropData
): HTMLDivElement | null {
  if (!eventTarget) return null;

  if (isDroppable(eventTarget)) {
    return <HTMLDivElement>eventTarget;
  }

  if (isDraggable(eventTarget)) {
    const draggable = <HTMLElement>eventTarget;
    return getClosestDroppable(draggable);
  }

  for (const droppable of emptyDroppables) {
    const droppableRect = droppable.getBoundingClientRect();
    if (intersect(draggedElementRect, droppableRect)) return droppable;
  }

  return null;
}

function isDroppable(eventTarget: EventTarget): boolean {
  if (eventTarget instanceof HTMLDivElement) {
    return !!eventTarget.dataset.droppableId;
  }

  return false;
}

export default findCurrDroppable;
