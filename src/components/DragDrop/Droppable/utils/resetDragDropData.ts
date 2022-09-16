import type { DragDropData, Rect } from '../../types';

function resetDragDropData(dragDropData: DragDropData): void {
  const { draggedElementRect } = dragDropData;
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

  dragDropData.isDragging = false;
}

export default resetDragDropData;
