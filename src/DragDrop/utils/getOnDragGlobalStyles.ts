import {
  DATA_DRAGGABLE_CONTEXT_ID,
  DATA_DRAG_HANDLE_CONTEXT_ID,
} from '../constants';
import { DragDropTypes } from '../types';

function getOnDragGlobalStyles(draggedElementType: string): string {
  let styles = `
    body {
      cursor: grabbing;
      user-select: none;
      -webkit-user-select: none; 
    }

    [data-draggable-context-id="${DATA_DRAGGABLE_CONTEXT_ID}"] {
      transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
    }

    [data-drag-handle-context-id="${DATA_DRAG_HANDLE_CONTEXT_ID}"] {
      pointer-events: none;
    }
  `;

  if (draggedElementType === DragDropTypes.List) {
    styles += `
      [data-droppable-type="${DragDropTypes.Card}"] {
        pointer-events: none;
      }
    `;
  }

  return styles;
}

export default getOnDragGlobalStyles;
