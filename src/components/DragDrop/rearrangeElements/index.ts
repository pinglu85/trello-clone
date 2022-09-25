import { getDroppableId } from '../utils/getDroppableInfo';
import getDraggablesInDroppable from './getDraggablesInDroppable';
import findIntersectingDraggable from './findIntersectingDraggable';
import getInsertPosition from './getInsertPosition';
import { InsertPositions } from './types';
import updateEmptyDroppables from './updateEmptyDroppables';
import { DATA_PLACEHOLDER_ID } from '../constants';
import type { DragDropData, MousePosition } from '../types';

function rearrangeElements(
  mousePosition: MousePosition,
  currDroppable: HTMLDivElement,
  currDroppableType: string,
  dragDropData: DragDropData
): void {
  const { draggedElement, draggedElementType, placeholder } = dragDropData;
  if (
    !draggedElement ||
    !placeholder ||
    currDroppableType !== draggedElementType
  ) {
    return;
  }

  const currDroppableId = getDroppableId(currDroppable);
  if (dragDropData.emptyDroppables.has(currDroppable)) {
    dragDropData.destinationIdx = 0;
    dragDropData.newParentId = currDroppableId;
    currDroppable.appendChild(placeholder);
    return;
  }

  const draggablesInCurrDroppable = getDraggablesInDroppable(currDroppable);

  const draggedElementId = getDraggedElementId(draggedElement);
  const [draggable, draggableRect, draggableIdx] = findIntersectingDraggable(
    draggedElementId,
    dragDropData.draggedElementRect,
    draggablesInCurrDroppable
  );

  if (!draggable || !draggableRect) return;

  const insertPosition = getInsertPosition(
    mousePosition,
    dragDropData.draggedElementRect,
    draggableRect,
    dragDropData.newParentId,
    currDroppableId,
    currDroppableType
  );

  let destinationIdx = -1;
  let insertReferenceNode: Element | null = null;

  switch (insertPosition) {
    case InsertPositions.Before:
      if (!isPreviousSiblingPlaceholder(draggable)) {
        insertReferenceNode = draggable;
        destinationIdx = draggableIdx;
      }
      break;
    case InsertPositions.After:
      if (!isNextSiblingPlaceholder(draggable)) {
        insertReferenceNode = draggable.nextElementSibling;
        destinationIdx = draggableIdx + 1;
      }
      break;
    default:
    // do nothing
  }

  if (destinationIdx !== -1) {
    dragDropData.destinationIdx = destinationIdx;
    dragDropData.newParentId = currDroppableId;
    updateEmptyDroppables(
      dragDropData.initParentId,
      currDroppableId,
      dragDropData.emptyDroppables,
      dragDropData.droppables
    );
    currDroppable.insertBefore(placeholder, insertReferenceNode);
  }
}

function getDraggedElementId(draggedElement: HTMLElement): string {
  return draggedElement.dataset.draggableId as string;
}

function isPreviousSiblingPlaceholder(element: HTMLElement): boolean {
  return isPlaceholder(<HTMLElement>element.previousElementSibling);
}

function isNextSiblingPlaceholder(element: HTMLElement): boolean {
  return isPlaceholder(<HTMLElement>element.nextElementSibling);
}

function isPlaceholder(element: HTMLElement | null): boolean {
  return element?.dataset.placeholderId === DATA_PLACEHOLDER_ID;
}

export default rearrangeElements;
