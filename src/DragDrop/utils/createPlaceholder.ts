import { DATA_PLACEHOLDER_ID } from '../constants/ids';

function createPlaceholder(
  draggedElement: HTMLElement,
  draggedElementHeight: number,
  placeholderClassName: string
): HTMLDivElement {
  const placeholder = document.createElement('div');
  placeholder.dataset.placeholderId = DATA_PLACEHOLDER_ID;

  const draggedElementClassNames =
    draggedElement.getAttribute('class')?.split(' ') ?? [];
  placeholder.classList.add(...draggedElementClassNames, placeholderClassName);

  placeholder.setAttribute(
    'style',
    `
      height: ${draggedElementHeight}px;
      box-shadow: none;
      pointer-events: none;
    `
  );

  return placeholder;
}

export default createPlaceholder;
