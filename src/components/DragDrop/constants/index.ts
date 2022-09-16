export const DATA_PLACEHOLDER_ID = 'drag-drop-placeholder';

export const DATA_DRAGGABLE_CONTEXT_ID = '0';

export const DATA_DRAG_HANDLE_CONTEXT_ID = '0';

export const ON_DRAG_GLOBAL_STYLES = `
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

export const INIT_GLOBAL_STYLES = `
  [data-drag-handle-context-id="${DATA_DRAG_HANDLE_CONTEXT_ID}"] { 
    cursor: grab;
  }
`;
