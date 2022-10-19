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
import insertPlaceholder from './insertPlaceholder';
import resetContext from './utils/resetContext';
import DragDropContext from './context';
import type { IDragDropContext, MousePosition, OnDragEnd } from './types';

interface DragDropProps extends WithChildrenProps {
  onDragEnd: OnDragEnd;
}

type SetGlobalStyles = (newStyles: string) => void;

const DragDrop = ({ onDragEnd, children }: DragDropProps): JSX.Element => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const contextRef = useRef<IDragDropContext>({
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
      const context = contextRef.current;
      const { isDragging, draggedElement, draggedElementType } = context;
      if (!draggedElement) return;

      updateMousePosition(e, mousePosition);

      if (isDragging) {
        currDroppable = findCurrDroppable(e.target, context);
      } else {
        currDroppable = getClosestDroppable(draggedElement);
        if (!currDroppable) return;

        context.isDragging = true;
        isRAFRunning = false;

        const { width, height } = context.draggedElementRect;
        setDraggedElementInitStyles(draggedElement, width, height);
        const placeholder = createPlaceholder(
          draggedElement,
          height,
          context.placeholderClassName
        );
        context.placeholder = placeholder;
        currDroppable.insertBefore(placeholder, draggedElement);

        const droppableId = getDroppableId(currDroppable);
        context.initParentId = droppableId;
        context.newParentId = droppableId;

        setGlobalStyles(getOnDragGlobalStyles(draggedElementType));
      }

      requestRAF();
      scrollDroppableCard(currDroppable, context);
    };

    function requestRAF(): void {
      if (!isRAFRunning) {
        isRAFRunning = true;
        requestAnimationFrame(update);
      }
    }

    function update(): void {
      const context = contextRef.current;
      if (context.isDragging) {
        moveDraggedElement(mousePosition, context);

        if (currDroppable) {
          const currDroppableType = getDroppableType(currDroppable);
          insertPlaceholder(
            mousePosition,
            currDroppable,
            currDroppableType,
            context
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
      const context = contextRef.current;
      const { draggedElement, isDragging, placeholder } = context;
      context.draggedElement = null;

      if (!isDragging || !draggedElement || !placeholder) return;

      setGlobalStyles(INIT_GLOBAL_STYLES);
      draggedElement.setAttribute('style', '');

      onDragEnd({
        sourceIdx: context.draggedElementInitIdx,
        destinationIdx: context.destinationIdx,
        oldParentId: context.initParentId,
        newParentId: context.newParentId,
      });

      placeholder.parentElement?.removeChild(placeholder);
      resetContext(contextRef.current);
    };

    document.body.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, [setGlobalStyles, onDragEnd]);

  useEffect(() => {
    const cancelDrag = (e: KeyboardEvent): void => {
      const context = contextRef.current;
      if (e.code === 'Escape' && context.isDragging) {
        setGlobalStyles(INIT_GLOBAL_STYLES);

        const { draggedElement, placeholder } = context;
        if (!draggedElement || !placeholder) return;

        draggedElement.setAttribute('style', '');
        placeholder.parentElement?.removeChild(placeholder);
        context.draggedElement = null;
        resetContext(contextRef.current);
      }
    };

    document.body.addEventListener('keydown', cancelDrag);

    return () => {
      document.body.removeEventListener('keydown', cancelDrag);
    };
  }, [contextRef, setGlobalStyles]);

  return (
    <DragDropContext.Provider value={contextRef}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDrop;
