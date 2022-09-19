function isDraggable(object: HTMLElement | EventTarget): boolean {
  if (object instanceof HTMLElement) {
    return !!object.dataset.draggableId;
  }

  return false;
}

export default isDraggable;
