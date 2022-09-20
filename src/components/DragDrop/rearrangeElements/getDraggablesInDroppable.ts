import isDraggable from '../utils/isDraggable';

function getDraggablesInDroppable(droppable: HTMLDivElement): HTMLElement[] {
  const draggablesInsideDroppable: HTMLElement[] = [];

  for (const element of droppable.children) {
    const childElement = <HTMLElement>element;
    if (isDraggable(childElement)) draggablesInsideDroppable.push(childElement);
  }

  return draggablesInsideDroppable;
}

export default getDraggablesInDroppable;
