import type { DragDropData, EmptyDroppables, Rect } from '../../../types';

function findIntersectingEmptyDroppable(
  draggedElementRect: Rect,
  droppableType: string,
  emptyDroppables: EmptyDroppables
): HTMLDivElement | null {
  for (const [droppable, type] of emptyDroppables) {
    if (type !== droppableType) continue;

    const droppableRect = droppable.getBoundingClientRect();
    if (intersect(draggedElementRect, droppableRect)) return droppable;
  }

  return null;
}

function findIntersectingDraggable(
  draggedElement: HTMLElement,
  draggedElementRect: Rect,
  draggedElementIdx: number,
  currDroppableId: string,
  draggablesInCurrDroppable: HTMLElement[],
  dragDropData: DragDropData
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

    if (isDraggedElement(draggable, draggedElement)) {
      if (draggedElementIdx === -1) {
        dragDropData.draggedElementIdx = i;
        dragDropData.initParentId = currDroppableId;
      }
    } else {
      const draggableRect = draggable.getBoundingClientRect();

      if (!intersect(draggedElementRect, draggableRect)) continue;

      if (!intersectingDraggable) {
        intersectingDraggable = draggable;
        intersectingDraggableRect = draggableRect;
        intersectingDraggableIdx = i;
      }

      if (dragDropData.draggedElementIdx !== -1) break;
    }
  }

  return [
    intersectingDraggable,
    intersectingDraggableRect,
    intersectingDraggableIdx,
  ];
}

// https://silentmatt.com/rectangle-intersection/
function intersect<T extends Rect>(element1: T, element2: T): boolean {
  return (
    element1.left < element2.right &&
    element1.top < element2.bottom &&
    element1.right > element2.left &&
    element1.bottom > element2.top
  );
}

function isDraggedElement(
  element: HTMLElement,
  draggedElement: HTMLElement
): boolean {
  return element.dataset.draggableId === draggedElement.dataset.draggableId;
}

export { findIntersectingEmptyDroppable, findIntersectingDraggable };
