import { useCallback, useEffect, useRef } from 'react';

import { INIT_GLOBAL_STYLES } from './constants/globalStyles';
import newRect from './utils/newRect';
import findCurrDroppable from './utils/findCurrDroppable';
import getClosestDroppable from './utils/getClosestDroppable';
import updateMousePosition from './utils/updateMousePosition';
import createPlaceholder from './utils/createPlaceholder';
import setDraggedElementInitStyles from './utils/setDraggedElementInitStyles';
import { getDroppableId, getDroppableType } from './utils/getDroppableInfo';
import getOnDragGlobalStyles from './utils/getOnDragGlobalStyles';
import scrollDroppableCard from './scrollDroppableCard';
import moveDraggedElement from './moveDraggedElement';
import rearrangeElements from './rearrangeElements';
import resetDragDropData from './utils/resetDragDropData';
import DragDropContext from './context';
import type { DragDropData, MousePosition, OnDragEnd } from './types';

interface DragDropProps extends WithChildrenProps {
  onDragEnd: OnDragEnd;
}

type SetGlobalStyles = (newStyles: string) => void;

const DragDrop = ({ onDragEnd, children }: DragDropProps): JSX.Element => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const dragDropDataRef = useRef<DragDropData>({
    isDragging: false,
    draggedElement: null,
    draggedElementType: '',
    draggedElementRect: newRect(),
    initDistanceFromDraggedElementLeftToMouseX: 0,
    initDistanceFromDraggedElementTopToMouseY: 0,
    draggedElementInitIdx: -1,
    initParentId: '',
    destinationIdx: -1,
    newParentId: '',
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
    const mousePosition: MousePosition = {
      pageX: 0,
      pageY: 0,
      movementX: 0,
      movementY: 0,
    };
    let currDroppable: HTMLDivElement | null = null;
    let isRAFRunning = false;

    const onMouseMove = (e: MouseEvent): void => {
      const dragDropData = dragDropDataRef.current;
      const { isDragging, draggedElement, draggedElementType } = dragDropData;
      if (!draggedElement) return;

      updateMousePosition(e, mousePosition);

      if (isDragging) {
        currDroppable = findCurrDroppable(e.target, dragDropData);
      } else {
        currDroppable = getClosestDroppable(draggedElement);
        if (!currDroppable) return;

        dragDropData.isDragging = true;
        isRAFRunning = false;

        const { width, height } = dragDropData.draggedElementRect;
        setDraggedElementInitStyles(draggedElement, width, height);
        const placeholder = createPlaceholder(
          draggedElement,
          height,
          dragDropData.placeholderClassName
        );
        dragDropData.placeholder = placeholder;
        currDroppable.insertBefore(placeholder, draggedElement);

        const droppableId = getDroppableId(currDroppable);
        dragDropData.initParentId = droppableId;
        dragDropData.newParentId = droppableId;

        setGlobalStyles(getOnDragGlobalStyles(draggedElementType));
      }

      requestRAF();
      scrollDroppableCard(currDroppable, dragDropData);
    };

    function requestRAF(): void {
      if (!isRAFRunning) {
        isRAFRunning = true;
        requestAnimationFrame(update);
      }
    }

    function update(): void {
      const dragDropData = dragDropDataRef.current;
      if (dragDropData.isDragging) {
        moveDraggedElement(mousePosition, dragDropData);

        if (currDroppable) {
          const currDroppableType = getDroppableType(currDroppable);
          rearrangeElements(
            mousePosition,
            currDroppable,
            currDroppableType,
            dragDropData
          );
        }
      }

      isRAFRunning = false;
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

  useEffect(() => {
    const cancelDrag = (e: KeyboardEvent): void => {
      const dragDropData = dragDropDataRef.current;
      if (e.code === 'Escape' && dragDropData.isDragging) {
        setGlobalStyles(INIT_GLOBAL_STYLES);

        const { draggedElement, placeholder } = dragDropData;
        if (!draggedElement || !placeholder) return;

        draggedElement.setAttribute('style', '');
        placeholder.parentElement?.removeChild(placeholder);
        dragDropData.draggedElement = null;
        resetDragDropData(dragDropDataRef.current);
      }
    };

    document.body.addEventListener('keydown', cancelDrag);

    return () => {
      document.body.removeEventListener('keydown', cancelDrag);
    };
  }, [dragDropDataRef, setGlobalStyles]);

  return (
    <DragDropContext.Provider value={dragDropDataRef}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDrop;
