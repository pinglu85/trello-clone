import intersect from '../utils/intersect';
import type { Rect } from '../types';

function findIntersectingDraggable(
  draggedElementId: string,
  draggedElementRect: Rect,
  draggablesInCurrDroppable: HTMLElement[]
): [
  draggable: HTMLElement | null,
  draggableRect: DOMRect | null,
  draggableIdx: number
] {
  let intersectingDraggable = null;
  let intersectingDraggableRect = null;
  let intersectingDraggableIdx = 0;

  for (let i = 0; i < draggablesInCurrDroppable.length; i++) {
    const draggable = draggablesInCurrDroppable[i];

    if (!isDraggedElement(draggable, draggedElementId)) {
      const draggableRect = draggable.getBoundingClientRect();

      if (intersect(draggedElementRect, draggableRect)) {
        intersectingDraggable = draggable;
        intersectingDraggableRect = draggableRect;
        intersectingDraggableIdx = i;
        break;
      }
    }
  }

  return [
    intersectingDraggable,
    intersectingDraggableRect,
    intersectingDraggableIdx,
  ];
}

function isDraggedElement(
  element: HTMLElement,
  draggedElementId: string
): boolean {
  return element.dataset.draggableId === draggedElementId;
}

export default findIntersectingDraggable;
