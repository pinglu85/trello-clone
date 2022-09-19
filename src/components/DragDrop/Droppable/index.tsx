import { Children, useContext, useEffect, useRef } from 'react';

import DragDropContext from '../DragDropContext';
import type { DroppableProps } from './types';

const Droppable = ({
  droppableId,
  type,
  children,
  ...props
}: DroppableProps): JSX.Element => {
  const { dragDropData } = useContext(DragDropContext);
  const droppableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!droppableRef.current) return;

    const { droppables, emptyDroppables } = dragDropData;
    const droppable = droppableRef.current;
    droppables.set(droppableId, droppable);

    return () => {
      droppables.delete(droppableId);
      emptyDroppables.delete(droppable);
    };
  }, [dragDropData, droppableId, type]);

  useEffect(() => {
    if (!droppableRef.current) return;

    const droppable = droppableRef.current;
    const { emptyDroppables } = dragDropData;

    if (Children.count(children) === 0) {
      emptyDroppables.add(droppable);
    } else if (emptyDroppables.has(droppable)) {
      emptyDroppables.delete(droppable);
    }
  }, [dragDropData, children, droppableId, type]);

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
