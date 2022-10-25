function findInsertPositionByRank<T extends Orderable>(
  items: T[],
  targetRank: string
): number {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (items[mid].rank > targetRank) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

export default findInsertPositionByRank;
