import { DragDropTypes } from '../types';
import { InsertPositions } from './types';
import type { MousePosition, Rect } from '../types';

function getInsertPosition(
  mousePosition: MousePosition,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  prevParentId: string,
  currDroppableId: string,
  currDroppableType: string
): string {
  if (currDroppableType === DragDropTypes.List) {
    return getHorizontalInsertPosition(
      mousePosition.movementX,
      draggedElementRect,
      intersectingElementRect,
      prevParentId === currDroppableId
    );
  }

  if (currDroppableType === DragDropTypes.Card) {
    return getVerticalInsertPosition(
      mousePosition.movementY,
      draggedElementRect,
      intersectingElementRect,
      prevParentId === currDroppableId
    );
  }

  return '';
}

function getHorizontalInsertPosition(
  mouseMovementX: number,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  isSameParent: boolean
): string {
  const halfWidth = draggedElementRect.width / 2;
  const draggedElementCenterX = draggedElementRect.left + halfWidth;

  if (
    (mouseMovementX > 0 || !isSameParent) &&
    draggedElementCenterX >= intersectingElementRect.left &&
    draggedElementRect.left <= intersectingElementRect.left
  ) {
    return InsertPositions.After;
  }

  if (
    (mouseMovementX < 0 || !isSameParent) &&
    draggedElementCenterX <= intersectingElementRect.right &&
    draggedElementRect.right >= intersectingElementRect.right
  ) {
    return InsertPositions.Before;
  }

  return '';
}

function getVerticalInsertPosition(
  mouseMovementY: number,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  isSameParent: boolean
): string {
  const halfHeight = draggedElementRect.height / 2;
  const draggedElementCenterY = draggedElementRect.top + halfHeight;

  if (
    (mouseMovementY > 0 || !isSameParent) &&
    draggedElementCenterY >= intersectingElementRect.top &&
    draggedElementRect.top <= intersectingElementRect.top
  ) {
    return InsertPositions.After;
  }

  if (
    (mouseMovementY < 0 || !isSameParent) &&
    draggedElementCenterY <= intersectingElementRect.bottom &&
    draggedElementRect.bottom >= intersectingElementRect.bottom
  ) {
    return InsertPositions.Before;
  }

  return '';
}

export default getInsertPosition;
