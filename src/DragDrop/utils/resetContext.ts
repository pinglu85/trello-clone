import type { IDragDropContext, Rect } from '../types';

function resetContext(context: IDragDropContext): void {
  context.isDragging = false;
  context.draggedElementType = '';

  const { draggedElementRect } = context;
  for (const key of Object.keys(draggedElementRect) as (keyof Rect)[]) {
    draggedElementRect[key] = 0;
  }

  context.initDistanceFromDraggedElementLeftToMouseX = 0;
  context.initDistanceFromDraggedElementTopToMouseY = 0;
  context.draggedElementInitIndex = -1;
  context.initParentId = '';
  context.destinationIndex = -1;
  context.newParentId = '';

  context.placeholder = null;
  context.placeholderClassName = '';
}

export default resetContext;
