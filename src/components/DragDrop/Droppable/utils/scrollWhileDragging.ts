import type { DragDropData } from '../../types';

function scrollWhileDragging(
  currDroppable: HTMLDivElement,
  { draggedElement, draggedElementRect }: DragDropData
): void {
  if (!draggedElement) return;

  const THRESHOLD = 5;
  const { clientWidth, clientHeight, offsetLeft, offsetTop } = currDroppable;

  if (clientWidth + offsetLeft - draggedElementRect.right <= THRESHOLD) {
    currDroppable.scrollLeft += THRESHOLD;
  } else if (draggedElementRect.left - offsetLeft <= THRESHOLD) {
    currDroppable.scrollLeft -= THRESHOLD;
  }

  if (clientHeight + offsetTop - draggedElementRect.bottom <= THRESHOLD) {
    currDroppable.scrollTop += THRESHOLD;
  } else if (draggedElementRect.top - offsetTop <= THRESHOLD) {
    currDroppable.scrollTop -= THRESHOLD;
  }
}

export default scrollWhileDragging;
