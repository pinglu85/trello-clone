import type { DragDropData, MousePosition } from './types';

function scrollWhileDragging(
  mousePosition: MousePosition,
  currDroppable: HTMLDivElement,
  currDroppableType: string,
  { draggedElement, draggedElementType, draggedElementRect }: DragDropData
): void {
  if (!draggedElement || currDroppableType !== draggedElementType) return;

  const THRESHOLD = 10;
  const { clientWidth, clientHeight, offsetLeft, offsetTop } = currDroppable;
  const visibleAreaRight = offsetLeft + clientWidth;
  const visibleAreaBottom = offsetTop + clientHeight;

  if (
    mousePosition.pageX < offsetLeft ||
    mousePosition.pageX > visibleAreaRight ||
    mousePosition.pageY < offsetTop ||
    mousePosition.pageY > visibleAreaBottom
  ) {
    return;
  }

  if (visibleAreaRight - draggedElementRect.right <= THRESHOLD) {
    currDroppable.scrollLeft += THRESHOLD;
  } else if (draggedElementRect.left - offsetLeft <= THRESHOLD) {
    currDroppable.scrollLeft -= THRESHOLD;
  }

  if (visibleAreaBottom - draggedElementRect.bottom <= THRESHOLD) {
    currDroppable.scrollTop += THRESHOLD;
  } else if (draggedElementRect.top - offsetTop <= THRESHOLD) {
    currDroppable.scrollTop -= THRESHOLD;
  }
}

export default scrollWhileDragging;
