import { ScrollDirections } from '../types';

function isOverscroll(
  droppable: HTMLDivElement,
  scrollDirection: ScrollDirections
): boolean {
  if (scrollDirection === ScrollDirections.Top) return droppable.scrollTop <= 0;

  if (scrollDirection === ScrollDirections.Bottom) {
    return (
      droppable.scrollTop + droppable.clientHeight >= droppable.scrollHeight
    );
  }

  if (scrollDirection === ScrollDirections.Left) {
    return droppable.scrollLeft <= 0;
  }

  return droppable.scrollLeft + droppable.clientWidth >= droppable.scrollWidth;
}

export default isOverscroll;
