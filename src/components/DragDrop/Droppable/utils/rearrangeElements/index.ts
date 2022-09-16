import {
  findIntersectingDraggable,
  findIntersectingEmptyDroppable,
} from './findIntersectingElement';
import getDraggablesInDroppable from './getDraggablesInDroppable';
import getInsertPosition from './getInsertPosition';
import { DATA_PLACEHOLDER_ID } from '../../../constants';
import { InsertPositions } from './types';
import type { DragDropData, DroppableTypes } from '../../../types';

function rearrangeElements(
  e: React.MouseEvent,
  currDroppable: HTMLDivElement,
  currDroppableType: DroppableTypes,
  dragDropData: DragDropData
): void {
  const { draggedElement, draggedElementRect, placeholder } = dragDropData;
  if (!placeholder || !draggedElement) return;

  if (currDroppableType !== dragDropData.droppableType) {
    const intersectingEmptyDroppable = findIntersectingEmptyDroppable(
      draggedElementRect,
      dragDropData.droppableType,
      dragDropData.emptyDroppables
    );

    if (intersectingEmptyDroppable) {
      dragDropData.destinationIdx = 0;
      dragDropData.newParentId = getDroppableId(intersectingEmptyDroppable);
      intersectingEmptyDroppable.appendChild(placeholder);
    }

    return;
  }

  const currDroppableId = getDroppableId(currDroppable);
  const draggablesInCurrDroppable = getDraggablesInDroppable(currDroppable);
  const [draggable, draggableRect, draggableIdx] = findIntersectingDraggable(
    draggedElement,
    draggedElementRect,
    dragDropData.draggedElementIdx,
    currDroppableId,
    draggablesInCurrDroppable,
    dragDropData
  );

  if (!draggable || !draggableRect) return;

  const insertPosition = getInsertPosition(
    e,
    draggedElementRect,
    draggableRect,
    dragDropData.newParentId,
    currDroppableId,
    currDroppableType
  );

  let destinationIdx = -1;
  let insertionReferenceNode = null;

  switch (insertPosition) {
    case InsertPositions.Before:
      if (!isPreviousSiblingPlaceholder(draggable)) {
        insertionReferenceNode = draggable;
        destinationIdx = draggableIdx;
      }
      break;
    case InsertPositions.After:
      if (!isNextSiblingPlaceholder(draggable)) {
        insertionReferenceNode = draggable.nextElementSibling;
        destinationIdx = draggableIdx + 1;
      }
      break;
    default:
    // do nothing
  }

  if (destinationIdx !== -1) {
    dragDropData.destinationIdx = destinationIdx;
    dragDropData.newParentId = currDroppableId;
    currDroppable.insertBefore(placeholder, insertionReferenceNode);
  }
}

function getDroppableId(droppable: HTMLDivElement): string {
  return droppable.dataset.droppableId as string;
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
