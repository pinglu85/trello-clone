import intersect from './intersect';
import type { Rect } from '../types';

function findIntersectingDraggable(
  draggedElementId: string,
  draggedElementRect: Rect,
  draggablesInCurrDroppable: Element[]
): [
  draggable: Element | null,
  draggableRect: DOMRect | null,
  draggableIndex: number
] {
  let intersectingDraggable = null;
  let intersectingDraggableRect = null;
  let intersectingDraggableIndex = 0;

  for (let i = 0; i < draggablesInCurrDroppable.length; i++) {
    const draggable = draggablesInCurrDroppable[i];

    if (!isDraggedElement(draggable, draggedElementId)) {
      const draggableRect = draggable.getBoundingClientRect();

      if (intersect(draggedElementRect, draggableRect)) {
        intersectingDraggable = draggable;
        intersectingDraggableRect = draggableRect;
        intersectingDraggableIndex = i;
        break;
      }
    }
  }

  return [
    intersectingDraggable,
    intersectingDraggableRect,
    intersectingDraggableIndex,
  ];
}

function isDraggedElement(element: Element, draggedElementId: string): boolean {
  if (element instanceof HTMLElement) {
    return element.dataset.draggableId === draggedElementId;
  }

  return false;
}

export default findIntersectingDraggable;
