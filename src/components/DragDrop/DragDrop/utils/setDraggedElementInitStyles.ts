function setDraggedElementInitStyles(
  draggedElement: HTMLElement,
  draggedElementWidth: number,
  draggedElementHeight: number
): void {
  const styles = `
    opacity: 0;
    position: fixed;
    z-index: 5000;
    left: 0px;
    top: 0px;
    width: ${draggedElementWidth}px;
    height: ${draggedElementHeight}px;
    transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1);
  `;
  draggedElement.setAttribute('style', styles);
}

export default setDraggedElementInitStyles;
