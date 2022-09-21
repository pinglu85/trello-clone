import { useCallback, useEffect, useRef } from 'react';

import { INIT_GLOBAL_STYLES, ON_DRAG_GLOBAL_STYLES } from './constants';
import createInitRect from './utils/createInitRect';
import getClosestDroppable from './utils/getClosestDroppable';
import updateMousePosition from './utils/updateMousePosition';
import createPlaceholder from './utils/createPlaceholder';
import setDraggedElementInitStyles from './utils/setDraggedElementInitStyles';
import { getDroppableId, getDroppableType } from './utils/getDroppableInfo';
import findCurrDroppable from './utils/findCurrDroppable';
import moveDraggedElement from './moveDraggedElement';
import rearrangeElements from './rearrangeElements';
import scrollWhileDragging from './scrollWhileDragging';
import resetDragDropData from './utils/resetDragDropData';
import DragDropContext from './DragDropContext';
import type { MousePosition, OnDragEnd } from './types';
import type { DragDropData } from './types';

interface DragDropProps {
  onDragEnd: OnDragEnd;
  children: React.ReactNode;
}

type SetGlobalStyles = (newStyles: string) => void;

const DragDrop = ({ onDragEnd, children }: DragDropProps): JSX.Element => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const dragDropDataRef = useRef<DragDropData>({
    isDragging: false,
    isRAFRunning: false,
    draggedElement: null,
    draggedElementType: '',
    draggedElementRect: createInitRect(),
    initDistanceFromDraggedElementLeftToMouseX: 0,
    initDistanceFromDraggedElementTopToMouseY: 0,
    draggedElementInitIdx: -1,
    initParentId: '',
    destinationIdx: -1,
    newParentId: '',
    droppables: new Map(),
    emptyDroppables: new Set(),
    placeholder: null,
    placeholderClassName: '',
  });

  const setGlobalStyles: SetGlobalStyles = useCallback((newStyles) => {
    if (styleElementRef.current) {
      styleElementRef.current.textContent = newStyles;
    }
  }, []);

  useEffect(() => {
    styleElementRef.current = document.createElement('style');
    const head = document.querySelector('head') as HTMLHeadElement;
    head.appendChild(styleElementRef.current);
    setGlobalStyles(INIT_GLOBAL_STYLES);

    return () => {
      if (styleElementRef.current) {
        head.removeChild(styleElementRef.current);
      }
    };
  }, [setGlobalStyles]);

  useEffect(() => {
    let eventTarget: EventTarget | null = null;
    const mousePosition: MousePosition = {
      pageX: 0,
      pageY: 0,
      movementX: 0,
      movementY: 0,
    };

    const onMouseMove = (e: MouseEvent): void => {
      const dragDropData = dragDropDataRef.current;
      const { isDragging, draggedElement } = dragDropData;
      if (!draggedElement) return;

      eventTarget = e.target;
      updateMousePosition(e, mousePosition);

      if (!isDragging) {
        const droppable = getClosestDroppable(draggedElement);
        if (!droppable) return;

        dragDropData.isDragging = true;

        const { width, height } = dragDropData.draggedElementRect;
        const placeholder = createPlaceholder(
          draggedElement,
          width,
          height,
          dragDropData.placeholderClassName
        );
        dragDropData.placeholder = placeholder;
        setDraggedElementInitStyles(draggedElement, width, height);
        droppable.insertBefore(placeholder, draggedElement);

        const droppableId = getDroppableId(droppable);
        dragDropData.initParentId = droppableId;
        dragDropData.newParentId = droppableId;

        setGlobalStyles(ON_DRAG_GLOBAL_STYLES);
      }

      requestRAF();
    };

    function requestRAF(): void {
      if (!dragDropDataRef.current.isRAFRunning) {
        dragDropDataRef.current.isRAFRunning = true;
        requestAnimationFrame(update);
      }
    }

    function update(): void {
      const dragDropData = dragDropDataRef.current;
      if (dragDropData.isDragging) {
        moveDraggedElement(mousePosition, dragDropData);

        const currDroppable = findCurrDroppable(eventTarget, dragDropData);
        if (currDroppable) {
          const currDroppableType = getDroppableType(currDroppable);
          rearrangeElements(
            mousePosition,
            currDroppable,
            currDroppableType,
            dragDropData
          );
          scrollWhileDragging(
            mousePosition,
            currDroppable,
            currDroppableType,
            dragDropData
          );
        }
      }

      dragDropData.isRAFRunning = false;
    }

    document.body.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, [setGlobalStyles]);

  useEffect(() => {
    const onMouseUp = (): void => {
      const dragDropData = dragDropDataRef.current;
      const { draggedElement, isDragging, placeholder } = dragDropData;
      dragDropData.draggedElement = null;

      if (!isDragging || !draggedElement || !placeholder) return;

      setGlobalStyles(INIT_GLOBAL_STYLES);
      draggedElement.setAttribute('style', '');

      onDragEnd({
        sourceIdx: dragDropData.draggedElementInitIdx,
        destinationIdx: dragDropData.destinationIdx,
        oldParentId: dragDropData.initParentId,
        newParentId: dragDropData.newParentId,
      });

      placeholder.parentElement?.removeChild(placeholder);
      resetDragDropData(dragDropDataRef.current);
    };

    document.body.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, [setGlobalStyles, onDragEnd]);

  return (
    <DragDropContext.Provider value={dragDropDataRef}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDrop;
