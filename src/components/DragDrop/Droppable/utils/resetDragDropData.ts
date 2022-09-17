import type { DragDropData, PointerPosition, Rect } from '../../types';

function resetDragDropData(dragDropData: DragDropData): void {
  dragDropData.isDragging = false;

  const { draggedElementRect, pointerPosition } = dragDropData;

  for (const key of Object.keys(pointerPosition) as (keyof PointerPosition)[]) {
    pointerPosition[key] = 0;
  }

  for (const key of Object.keys(draggedElementRect) as (keyof Rect)[]) {
    draggedElementRect[key] = 0;
  }

  dragDropData.initDistanceFromDraggedElementLeftToMouseX = 0;
  dragDropData.initDistanceFromDraggedElementTopToMouseY = 0;

  dragDropData.droppableType = '';

  dragDropData.draggedElementIdx = -1;
  dragDropData.destinationIdx = -1;
  dragDropData.initParentId = '';
  dragDropData.newParentId = '';

  dragDropData.placeholder = null;
  dragDropData.placeholderClassName = '';
}

export default resetDragDropData;
