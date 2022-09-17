import { useEffect, useRef } from 'react';

import { INIT_GLOBAL_STYLES } from './constants';
import DragDropContext from './DragDropContext';
import type { DragDropProps, DragDropData, SetGlobalStyles } from './types';

const DragDrop = ({ onDragEnd, children }: DragDropProps): JSX.Element => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const dragDropDataRef = useRef<DragDropData>({
    isDragging: false,
    pointerPosition: {
      pageX: 0,
      pageY: 0,
      movementX: 0,
      movementY: 0,
    },
    draggedElement: null,
    draggedElementRect: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    initDistanceFromDraggedElementLeftToMouseX: 0,
    initDistanceFromDraggedElementTopToMouseY: 0,
    droppableType: '',
    draggedElementIdx: -1,
    destinationIdx: -1,
    initParentId: '',
    newParentId: '',
    emptyDroppables: new Map(),
    placeholder: null,
    placeholderClassName: '',
  });

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
  }, []);

  const setGlobalStyles: SetGlobalStyles = (newStyles) => {
    if (styleElementRef.current) {
      styleElementRef.current.textContent = newStyles;
    }
  };

  return (
    <DragDropContext.Provider
      value={{
        dragDropData: dragDropDataRef.current,
        onDragEnd,
        setGlobalStyles,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDrop;
