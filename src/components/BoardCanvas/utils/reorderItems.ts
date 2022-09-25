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

export default reorderItems;
