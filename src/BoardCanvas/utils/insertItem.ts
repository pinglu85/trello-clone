function insertItem<T>(items: T[], sourceItem: T, destinationIdx: number): T[] {
  const newItems = [];

  for (let i = 0; i < items.length; i++) {
    if (i === destinationIdx) newItems.push(sourceItem);

    newItems.push(items[i]);
  }

  if (destinationIdx === items.length) {
    newItems.push(sourceItem);
  }

  return newItems;
}

export default insertItem;
