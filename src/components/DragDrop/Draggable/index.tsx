import { useContext, useRef } from 'react';

import DragDropContext from '../DragDropContext';
import {
  DATA_DRAGGABLE_CONTEXT_ID,
  DATA_DRAG_HANDLE_CONTEXT_ID,
} from '../constants';
import type { DraggableProps } from './types';
import type { Rect } from '../types';

const Draggable = ({
  draggableId,
  placeHolderClassName = '',
  children,
}: DraggableProps): JSX.Element => {
  const { dragDropData } = useContext(DragDropContext);
  const draggableRef = useRef<HTMLElement>(null);

  const onMouseDown = (e: React.MouseEvent): void => {
    if (!draggableRef.current || e.button !== 0) return;

    e.preventDefault();

    const draggable = draggableRef.current;
    dragDropData.draggedElement = draggable;

    const draggableRect = draggable.getBoundingClientRect();
    dragDropData.initDistanceFromDraggedElementLeftToMouseX =
      e.pageX - draggableRect.left;
    dragDropData.initDistanceFromDraggedElementTopToMouseY =
      e.pageY - draggableRect.top;

    const { draggedElementRect } = dragDropData;
    for (const key of Object.keys(draggedElementRect) as (keyof Rect)[]) {
      draggedElementRect[key] = draggableRect[key];
    }

    dragDropData.placeholderClassName = placeHolderClassName;
  };

  return (
    <>
      {children({
        draggableProps: {
          ref: draggableRef,
          'data-draggable-id': draggableId,
          'data-draggable-context-id': DATA_DRAGGABLE_CONTEXT_ID,
        },
        dragHandleProps: {
          onMouseDown,
          draggable: false,
          'data-drag-handle-id': draggableId,
          'data-drag-handle-context-id': DATA_DRAG_HANDLE_CONTEXT_ID,
        },
      })}
    </>
  );
};

export default Draggable;
