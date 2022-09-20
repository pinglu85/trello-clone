function getDroppableId(droppable: HTMLDivElement): string {
  return droppable.dataset.droppableId as string;
}

function getDroppableType(droppable: HTMLDivElement): string {
  return droppable.dataset.droppableType ?? '';
}

export { getDroppableId, getDroppableType };
