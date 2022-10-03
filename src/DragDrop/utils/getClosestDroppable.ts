function getClosestDroppable(draggable: HTMLElement): HTMLDivElement | null {
  return draggable.closest('[data-droppable-id]');
}

export default getClosestDroppable;
