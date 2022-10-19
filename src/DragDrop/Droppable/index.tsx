import { useContext, useEffect, useRef } from 'react';

import DragDropContext from '../context';
import { DragDropTypes, ScrollDirections } from '../types';
import isOverscroll from '../utils/isOverscroll';

interface DroppableProps extends WithChildrenProps {
  droppableId: string;
  type: DragDropTypes;
  className?: string;
}

const DROPPABLE_LIST_SCROLL_THRESHOLD = 70;
const SCROLL_DISTANCE = 10;

const Droppable = ({
  droppableId,
  type,
  children,
  ...props
}: DroppableProps): JSX.Element => {
  const contextRef = useContext(DragDropContext);
  const droppableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== DragDropTypes.List || !droppableRef.current || !contextRef) {
      return;
    }

    const droppable = droppableRef.current;
    const context = contextRef.current;
    let isScrolling = false;
    let scrollDirection: ScrollDirections | '' = '';

    const scrollDroppable = (): void => {
      const { isDragging, draggedElementRect } = context;
      if (!isDragging) return;

      const { clientWidth, offsetLeft } = droppable;
      const distanceToVisibleAreaRight =
        offsetLeft + clientWidth - draggedElementRect.right;
      const distanceToVisibleAreaLeft = draggedElementRect.left - offsetLeft;

      if (distanceToVisibleAreaRight <= DROPPABLE_LIST_SCROLL_THRESHOLD) {
        scrollDirection = ScrollDirections.Right;
      } else if (distanceToVisibleAreaLeft <= DROPPABLE_LIST_SCROLL_THRESHOLD) {
        scrollDirection = ScrollDirections.Left;
      } else {
        scrollDirection = '';
      }

      if (!isScrolling) requestAnimationFrame(scroll);
    };

    function scroll(): void {
      isScrolling = true;

      if (
        scrollDirection === '' ||
        !context.isDragging ||
        isOverscroll(droppable, scrollDirection)
      ) {
        isScrolling = false;
        return;
      }

      if (scrollDirection === ScrollDirections.Left) {
        droppable.scrollLeft -= SCROLL_DISTANCE;
      } else if (scrollDirection === ScrollDirections.Right) {
        droppable.scrollLeft += SCROLL_DISTANCE;
      }
      requestAnimationFrame(scroll);
    }

    document.body.addEventListener('mousemove', scrollDroppable);

    return () => {
      document.body.removeEventListener('mousemove', scrollDroppable);
    };
  }, [droppableRef, contextRef, type]);

  return (
    <div
      ref={droppableRef}
      data-droppable-id={droppableId}
      data-droppable-type={type}
      {...props}
    >
      {children}
    </div>
  );
};

export default Droppable;
