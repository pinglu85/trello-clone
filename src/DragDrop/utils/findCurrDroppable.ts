import getClosestDroppable from './getClosestDroppable';
import { DragDropTypes } from '../types';
import type { IDragDropContext } from '../types';

function findCurrDroppable(
  eventTarget: EventTarget | null,
  { draggedElement, draggedElementType }: IDragDropContext
): HTMLDivElement | null {
  if (!(eventTarget instanceof Element)) return null;

  if (isDroppable(eventTarget)) return <HTMLDivElement>eventTarget;

  if (draggedElementType === DragDropTypes.List) {
    return draggedElement && getClosestDroppable(draggedElement);
  }

  return findClosestChildDroppable(eventTarget);
}

function findClosestChildDroppable(parent: Element): HTMLDivElement | null {
  const stack: Element[] = [parent];

  while (stack.length > 0) {
    const element = <Element>stack.pop();
    if (isDroppable(element)) return <HTMLDivElement>element;

    stack.push(...element.children);
  }

  return null;
}

function isDroppable(eventTarget: Element): boolean {
  if (eventTarget instanceof HTMLElement) {
    return !!eventTarget.dataset.droppableId;
  }

  return false;
}

export default findCurrDroppable;
