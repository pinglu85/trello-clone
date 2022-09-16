import { DroppableTypes } from '../../../types';
import { InsertPositions } from './types';
import type { Rect } from '../../../types';

enum IntersectingHalves {
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  Bottom = 'BOTTOM',
}

function getInsertPosition(
  e: React.MouseEvent,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect,
  droppableType: DroppableTypes
): string {
  const intersectingHalf =
    droppableType === DroppableTypes.Column
      ? getHorizontalIntersectingHalf(
          e,
          draggedElementRect,
          intersectingElementRect
        )
      : getVerticalIntersectingHalf(
          e,
          draggedElementRect,
          intersectingElementRect
        );

  switch (intersectingHalf) {
    case IntersectingHalves.Left:
    case IntersectingHalves.Top:
      return InsertPositions.After;
    case IntersectingHalves.Right:
    case IntersectingHalves.Bottom:
      return InsertPositions.Before;
    default:
      return '';
  }
}

function getHorizontalIntersectingHalf(
  e: React.MouseEvent,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect
): string {
  const halfWidth = draggedElementRect.width / 2;
  const draggedElementCenterX = draggedElementRect.left + halfWidth;

  if (
    e.movementX > 0 &&
    draggedElementCenterX >= intersectingElementRect.left &&
    draggedElementRect.left <= intersectingElementRect.left
  ) {
    return IntersectingHalves.Left;
  }

  if (
    e.movementX < 0 &&
    draggedElementCenterX <= intersectingElementRect.right &&
    draggedElementRect.right >= intersectingElementRect.right
  ) {
    return IntersectingHalves.Right;
  }

  return '';
}

function getVerticalIntersectingHalf(
  e: React.MouseEvent,
  draggedElementRect: Rect,
  intersectingElementRect: DOMRect
): string {
  const halfHeight = draggedElementRect.height / 2;
  const draggedElementCenterY = draggedElementRect.top + halfHeight;

  if (
    e.movementY > 0 &&
    draggedElementCenterY >= intersectingElementRect.top &&
    draggedElementRect.top <= intersectingElementRect.top
  ) {
    return IntersectingHalves.Top;
  }

  if (
    e.movementY < 0 &&
    draggedElementCenterY <= intersectingElementRect.bottom &&
    draggedElementRect.bottom >= intersectingElementRect.bottom
  ) {
    return IntersectingHalves.Bottom;
  }

  return '';
}

export default getInsertPosition;
