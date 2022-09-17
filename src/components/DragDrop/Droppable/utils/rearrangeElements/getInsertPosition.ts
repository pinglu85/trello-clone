import { DroppableTypes } from '../../../types';
import { InsertPositions } from './types';
import type { PointerPosition, Rect } from '../../../types';

function getInsertPosition(
  pointerPosition: PointerPosition,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  prevParentId: string,
  currDroppableId: string,
  currDroppableType: DroppableTypes
): string {
  if (currDroppableType === DroppableTypes.Column) {
    return getHorizontalInsertPosition(
      pointerPosition.movementX,
      draggedElementRect,
      intersectingElementRect,
      prevParentId === currDroppableId
    );
  }

  return getVerticalInsertPosition(
    pointerPosition.movementY,
    draggedElementRect,
    intersectingElementRect,
    prevParentId === currDroppableId
  );
}

function getHorizontalInsertPosition(
  pointerMovementX: number,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  isSameParent: boolean
): string {
  const halfWidth = draggedElementRect.width / 2;
  const draggedElementCenterX = draggedElementRect.left + halfWidth;

  if (
    (pointerMovementX > 0 || !isSameParent) &&
    draggedElementCenterX >= intersectingElementRect.left &&
    draggedElementRect.left <= intersectingElementRect.left
  ) {
    return InsertPositions.After;
  }

  if (
    (pointerMovementX < 0 || !isSameParent) &&
    draggedElementCenterX <= intersectingElementRect.right &&
    draggedElementRect.right >= intersectingElementRect.right
  ) {
    return InsertPositions.Before;
  }

  return '';
}

function getVerticalInsertPosition(
  pointerMovementY: number,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  isSameParent: boolean
): string {
  const halfHeight = draggedElementRect.height / 2;
  const draggedElementCenterY = draggedElementRect.top + halfHeight;

  if (
    (pointerMovementY > 0 || !isSameParent) &&
    draggedElementCenterY >= intersectingElementRect.top &&
    draggedElementRect.top <= intersectingElementRect.top
  ) {
    return InsertPositions.After;
  }

  if (
    (pointerMovementY < 0 || !isSameParent) &&
    draggedElementCenterY <= intersectingElementRect.bottom &&
    draggedElementRect.bottom >= intersectingElementRect.bottom
  ) {
    return InsertPositions.Before;
  }

  return '';
}

export default getInsertPosition;
