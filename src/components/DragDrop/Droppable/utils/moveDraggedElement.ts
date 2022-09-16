import type { DragDropData } from '../../types';

function moveDraggedElement(
  e: React.MouseEvent,
  {
    draggedElement,
    draggedElementRect,
    initDistanceFromDraggedElementLeftToMouseX,
    initDistanceFromDraggedElementTopToMouseY,
  }: DragDropData
): void {
  if (!draggedElement) return;

  const translateX = e.pageX - initDistanceFromDraggedElementLeftToMouseX;
  const translateY = e.pageY - initDistanceFromDraggedElementTopToMouseY;
  draggedElementRect.left = translateX;
  draggedElementRect.top = translateY;
  draggedElementRect.right = translateX + draggedElementRect.width;
  draggedElementRect.bottom = translateY + draggedElementRect.height;

  draggedElement.style.transform = `
    translate(
      ${translateX}px,
      ${translateY}px
    )
    rotate(5deg)
  `;

  if (draggedElement.style.opacity === '0') {
    draggedElement.style.opacity = '1';
  }
}

export default moveDraggedElement;
