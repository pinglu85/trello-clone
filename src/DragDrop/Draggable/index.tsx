import { useContext, useRef } from 'react';

import DragDropContext from '../context';
import {
  DATA_DRAGGABLE_CONTEXT_ID,
  DATA_DRAG_HANDLE_CONTEXT_ID,
} from '../constants';
import type { DragDropTypes, Rect } from '../types';

interface ProvidedDraggableProps {
  draggableContainerRef: React.MutableRefObject<HTMLElement | null>;
  draggableRef: React.MutableRefObject<HTMLElement | null>;
  'data-draggable-id': string;
  'data-draggable-context-id': string;
}
interface ProvidedDragHandleProps {
  dragHandleRef: React.MutableRefObject<HTMLElement | null>;
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
  placeholderClassName: string;
  children: (provided: DraggableChildrenProps) => JSX.Element;
}

const Draggable = ({
  draggableId,
  type,
  idx,
  placeholderClassName,
  children,
}: DraggableProps): JSX.Element => {
  const dragDropDataRef = useContext(DragDropContext);
  const draggableContainerRef = useRef<HTMLElement | null>(null);
  const draggableRef = useRef<HTMLElement | null>(null);
  const dragHandleRef = useRef<HTMLElement | null>(null);

  const onMouseDown = (e: React.MouseEvent): void => {
    if (
      e.button !== 0 ||
      !isEventTargetDragHandle(dragHandleRef, e.target) ||
      !draggableContainerRef.current ||
      !draggableRef.current ||
      !dragDropDataRef
    ) {
      return;
    }

    const dragDropData = dragDropDataRef.current;
    const draggableContainer = draggableContainerRef.current;
    dragDropData.draggedElement = draggableContainer;
    dragDropData.draggedElementType = type;
    dragDropData.draggedElementInitIdx = idx;

    const draggable = draggableRef.current;
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
      draggableContainerRef,
      draggableRef,
      'data-draggable-id': draggableId,
      'data-draggable-context-id': DATA_DRAGGABLE_CONTEXT_ID,
    },
    dragHandleProps: {
      dragHandleRef,
      onMouseDown,
      draggable: false,
      'data-drag-handle-id': draggableId,
      'data-drag-handle-context-id': DATA_DRAG_HANDLE_CONTEXT_ID,
    },
  });
};

function isEventTargetDragHandle(
  dragHandleRef: React.MutableRefObject<HTMLElement | null>,
  eventTarget: EventTarget
): boolean {
  if (!dragHandleRef.current || !(eventTarget instanceof HTMLElement)) {
    return false;
  }

  return dragHandleRef.current.contains(eventTarget);
}

export default Draggable;
