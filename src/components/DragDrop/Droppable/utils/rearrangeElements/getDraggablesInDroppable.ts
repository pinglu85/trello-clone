function getDraggablesInDroppable(droppable: HTMLDivElement): HTMLElement[] {
  const draggablesInsideDroppable: HTMLElement[] = [];
  for (const element of droppable.children) {
    const childElement = <HTMLElement>element;
    if (isDraggable(childElement)) draggablesInsideDroppable.push(childElement);
  }

  return draggablesInsideDroppable;
}

function isDraggable(element: HTMLElement): boolean {
  return !!element.dataset.draggableId;
}

export default getDraggablesInDroppable;
