import { Children, useContext, useEffect, useRef } from 'react';

import DragDropContext from '../DragDropContext';
import type { DroppableProps } from './types';

const Droppable = ({
  droppableId,
  type,
  children,
  ...props
}: DroppableProps): JSX.Element => {
  const dragDropDataRef = useContext(DragDropContext);
  const droppableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!droppableRef.current || !dragDropDataRef) return;

    const { droppables, emptyDroppables } = dragDropDataRef.current;
    const droppable = droppableRef.current;
    droppables.set(droppableId, droppable);

    return () => {
      droppables.delete(droppableId);
      emptyDroppables.delete(droppable);
    };
  }, [dragDropDataRef, droppableId, type]);

  useEffect(() => {
    if (!droppableRef.current || !dragDropDataRef) return;

    const droppable = droppableRef.current;
    const { emptyDroppables } = dragDropDataRef.current;

    if (Children.count(children) === 0) {
      emptyDroppables.add(droppable);
    } else if (emptyDroppables.has(droppable)) {
      emptyDroppables.delete(droppable);
    }
  }, [dragDropDataRef, children, droppableId, type]);

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
