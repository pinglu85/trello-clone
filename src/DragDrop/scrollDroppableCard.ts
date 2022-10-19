import { getDroppableType } from './utils/getDroppableInfo';
import { DragDropTypes, ScrollDirections } from './types';
import isOverscroll from './utils/isOverscroll';
import type { IDragDropContext } from './types';

const SCROLL_THRESHOLD = 50;
const SCROLL_DISTANCE = 5;
let isScrolling = false;
let scrollDirection: ScrollDirections | '' = '';

function scrollDroppableCard(
  droppable: HTMLDivElement | null,
  context: IDragDropContext
): void {
  const { isDragging, draggedElementRect, draggedElementType } = context;
  if (!droppable || !isDragging) return;

  const currDroppableType = getDroppableType(droppable);

  if (
    currDroppableType === DragDropTypes.List ||
    draggedElementType === DragDropTypes.List
  ) {
    return;
  }

  const { clientHeight, offsetTop } = droppable;
  const distanceToVisibleAreaBottom =
    offsetTop + clientHeight - draggedElementRect.bottom;
  const distanceToVisibleAreaTop = draggedElementRect.top - offsetTop;

  if (distanceToVisibleAreaBottom <= SCROLL_THRESHOLD) {
    scrollDirection = ScrollDirections.Bottom;
  } else if (distanceToVisibleAreaTop <= SCROLL_THRESHOLD) {
    scrollDirection = ScrollDirections.Top;
  } else {
    scrollDirection = '';
  }

  if (!isScrolling)
    requestAnimationFrame(() => {
      scroll(droppable, context);
    });
}

function scroll(droppable: HTMLDivElement, context: IDragDropContext): void {
  isScrolling = true;

  if (
    scrollDirection === '' ||
    !context.isDragging ||
    !droppable ||
    isOverscroll(droppable, scrollDirection)
  ) {
    isScrolling = false;
    return;
  }

  if (scrollDirection === ScrollDirections.Top) {
    droppable.scrollTop -= SCROLL_DISTANCE;
  } else if (scrollDirection === ScrollDirections.Bottom) {
    droppable.scrollTop += SCROLL_DISTANCE;
  }
  requestAnimationFrame(() => {
    scroll(droppable, context);
  });
}

export default scrollDroppableCard;
