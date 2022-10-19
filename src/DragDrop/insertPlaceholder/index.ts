import { getDroppableId } from '../utils/getDroppableInfo';
import getDraggablesInDroppable from './getDraggablesInDroppable';
import { DragDropTypes } from '../types';
import intersect from './intersect';
import findIntersectingDraggable from './findIntersectingDraggable';
import getInsertPosition from './getInsertPosition';
import { InsertPositions } from './types';
import { DATA_PLACEHOLDER_ID } from '../constants/ids';
import type { IDragDropContext, MousePosition } from '../types';

function insertPlaceholder(
  mousePosition: MousePosition,
  currDroppable: HTMLDivElement,
  currDroppableType: string,
  context: IDragDropContext
): void {
  const {
    draggedElement,
    draggedElementRect,
    draggedElementType,
    placeholder,
  } = context;

  if (
    !draggedElement ||
    !placeholder ||
    currDroppableType !== draggedElementType
  ) {
    return;
  }

  const currDroppableId = getDroppableId(currDroppable);
  const currDroppableRect = currDroppable.getBoundingClientRect();
  const draggablesInCurrDroppable = getDraggablesInDroppable(currDroppable);

  if (
    draggedElementType === DragDropTypes.Card &&
    (draggablesInCurrDroppable.length === 0 ||
      !intersect(draggedElementRect, currDroppableRect))
  ) {
    context.destinationIdx = draggablesInCurrDroppable.length;
    context.newParentId = currDroppableId;
    currDroppable.appendChild(placeholder);
    return;
  }

  const draggedElementId = getDraggedElementId(draggedElement);
  const [draggable, draggableRect, draggableIdx] = findIntersectingDraggable(
    draggedElementId,
    draggedElementRect,
    draggablesInCurrDroppable
  );

  if (!draggable || !draggableRect) return;

  const insertPosition = getInsertPosition(
    mousePosition,
    context.draggedElementRect,
    draggableRect,
    context.newParentId,
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
    context.destinationIdx = destinationIdx;
    context.newParentId = currDroppableId;
    currDroppable.insertBefore(placeholder, insertReferenceNode);
  }
}

function getDraggedElementId(draggedElement: HTMLElement): string {
  return draggedElement.dataset.draggableId as string;
}

function isPreviousSiblingPlaceholder(element: Element): boolean {
  return isPlaceholder(element.previousElementSibling);
}

function isNextSiblingPlaceholder(element: Element): boolean {
  return isPlaceholder(element.nextElementSibling);
}

function isPlaceholder(element: Element | null): boolean {
  if (element instanceof HTMLElement) {
    return element.dataset.placeholderId === DATA_PLACEHOLDER_ID;
  }

  return false;
}

export default insertPlaceholder;
