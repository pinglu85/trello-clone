import type { EmptyDroppables, Droppables } from '../types';

function updateEmptyDroppables(
  initParentId: string,
  currDroppableId: string,
  emptyDroppables: EmptyDroppables,
  droppables: Droppables
): void {
  if (initParentId === currDroppableId) return;

  const initParent = droppables.get(initParentId);
  if (!initParent) return;

  if (initParent.childElementCount === 1 && !emptyDroppables.has(initParent)) {
    emptyDroppables.add(initParent);
  }
}

export default updateEmptyDroppables;
