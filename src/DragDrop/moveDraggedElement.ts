import type { DragDropData, MousePosition } from './types';

function moveDraggedElement(
  mousePosition: MousePosition,
  {
    draggedElement,
    draggedElementRect,
    initDistanceFromDraggedElementLeftToMouseX,
    initDistanceFromDraggedElementTopToMouseY,
  }: DragDropData
): void {
  if (!draggedElement) return;

  const translateX =
    mousePosition.pageX - initDistanceFromDraggedElementLeftToMouseX;
  const translateY =
    mousePosition.pageY - initDistanceFromDraggedElementTopToMouseY;
  draggedElementRect.left = translateX;
  draggedElementRect.top = translateY;
  draggedElementRect.right = translateX + draggedElementRect.width;
  draggedElementRect.bottom = translateY + draggedElementRect.height;

  draggedElement.style.transform = `
    translate(
      ${translateX}px,
      ${translateY}px
    )
    rotate(4deg)
  `;

  if (draggedElement.style.opacity === '0') {
    draggedElement.style.opacity = '1';
  }
}

export default moveDraggedElement;
