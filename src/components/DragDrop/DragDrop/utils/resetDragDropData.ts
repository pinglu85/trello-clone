import type { DragDropData, Rect } from '../../sharedTypes';

function resetDragDropData(dragDropData: DragDropData): void {
  dragDropData.isDragging = false;
  dragDropData.isRAFRunning = false;
  dragDropData.draggedElementType = '';

  const { draggedElementRect } = dragDropData;
  for (const key of Object.keys(draggedElementRect) as (keyof Rect)[]) {
    draggedElementRect[key] = 0;
  }

  dragDropData.initDistanceFromDraggedElementLeftToMouseX = 0;
  dragDropData.initDistanceFromDraggedElementTopToMouseY = 0;
  dragDropData.draggedElementInitIdx = -1;
  dragDropData.initParentId = '';
  dragDropData.destinationIdx = -1;
  dragDropData.newParentId = '';

  dragDropData.placeholder = null;
  dragDropData.placeholderClassName = '';
}

export default resetDragDropData;
