function getDraggablesInDroppable(droppable: HTMLDivElement): Element[] {
  const draggablesInsideDroppable: Element[] = [];

  for (const element of droppable.children) {
    if (isDraggable(element)) draggablesInsideDroppable.push(element);
  }

  return draggablesInsideDroppable;
}

function isDraggable(element: Element): boolean {
  if (element instanceof HTMLElement) return !!element.dataset.draggableId;

  return false;
}

export default getDraggablesInDroppable;
