import type { GroupedCards } from './types';

function reorderGroupedCards(
  prevGroupedCards: GroupedCards,
  sourceIdx: number,
  destinationIdx: number,
  oldParentId: string,
  newParentId: string
): GroupedCards {
  const oldParentCards = prevGroupedCards[oldParentId];
  const sourceItem = oldParentCards[sourceIdx];

  if (newParentId === oldParentId) {
    return {
      ...prevGroupedCards,
      [oldParentId]: reorderItems(
        oldParentCards,
        sourceItem,
        sourceIdx,
        destinationIdx
      ),
    };
  }

  const newParentCards = prevGroupedCards[newParentId];
  return {
    ...prevGroupedCards,
    [newParentId]: reorderItems(newParentCards, sourceItem, -1, destinationIdx),
    [oldParentId]: oldParentCards.filter((_, idx) => idx !== sourceIdx),
  };
}

function reorderItems<T>(
  items: T[],
  sourceItem: T,
  sourceIdx: number,
  destinationIdx: number
): T[] {
  const newItems: T[] = [];

  for (let i = 0; i < items.length; i++) {
    if (i === sourceIdx) continue;

    if (i === destinationIdx) newItems.push(sourceItem);

    newItems.push(items[i]);
  }

  if (destinationIdx === items.length) {
    newItems.push(sourceItem);
  }

  return newItems;
}

export { reorderGroupedCards, reorderItems };
