import { useContext, useRef } from 'react';

import DragDropContext from '../DragDropContext';
import {
  DATA_DRAGGABLE_CONTEXT_ID,
  DATA_DRAG_HANDLE_CONTEXT_ID,
} from '../constants';
import type { DragDropTypes, Rect } from '../types';

interface ProvidedDraggableProps {
  draggableRef: React.RefObject<HTMLElement>;
  'data-draggable-id': string;
  'data-draggable-context-id': string;
}
interface ProvidedDragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  draggable: false;
  'data-drag-handle-id': string;
  'data-drag-handle-context-id': string;
}
interface DraggableChildrenProps {
  draggableProps: ProvidedDraggableProps;
  dragHandleProps: ProvidedDragHandleProps;
}

interface DraggableProps {
  draggableId: string;
  type: DragDropTypes;
  idx: number;
  placeholderClassName?: string;
  children: (provided: DraggableChildrenProps) => JSX.Element;
}

const Draggable = ({
  draggableId,
  type,
  idx,
  placeholderClassName = '',
  children,
}: DraggableProps): JSX.Element => {
  const dragDropDataRef = useContext(DragDropContext);
  const draggableRef = useRef<HTMLElement>(null);

  const onMouseDown = (e: React.MouseEvent): void => {
    if (!draggableRef.current || e.button !== 0 || !dragDropDataRef) return;

    e.preventDefault();

    const dragDropData = dragDropDataRef.current;
    const draggable = draggableRef.current;
    dragDropData.draggedElement = draggable;
    dragDropData.draggedElementType = type;
    dragDropData.draggedElementInitIdx = idx;

    const draggableRect = draggable.getBoundingClientRect();
    dragDropData.initDistanceFromDraggedElementLeftToMouseX =
      e.pageX - draggableRect.left;
    dragDropData.initDistanceFromDraggedElementTopToMouseY =
      e.pageY - draggableRect.top;

    const { draggedElementRect } = dragDropData;
    for (const key of Object.keys(draggedElementRect) as (keyof Rect)[]) {
      draggedElementRect[key] = draggableRect[key];
    }

    dragDropData.placeholderClassName = placeholderClassName;
  };

  return children({
    draggableProps: {
      draggableRef,
      'data-draggable-id': draggableId,
      'data-draggable-context-id': DATA_DRAGGABLE_CONTEXT_ID,
    },
    dragHandleProps: {
      onMouseDown,
      draggable: false,
      'data-drag-handle-id': draggableId,
      'data-drag-handle-context-id': DATA_DRAG_HANDLE_CONTEXT_ID,
    },
  });
};

export default Draggable;
